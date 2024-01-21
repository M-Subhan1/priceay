import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import getPayloadClient from "@/payload/payloadClient";

type StoreSummary = {
  storeId: string;
  first: number;
  second: number;
  third: number;
}[];

const pagination = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = await getPayloadClient();

  if (req.method === "GET") {
    const params = pagination.parse(req.query);
    const data = (await prisma.products.aggregateRaw({
      pipeline: [
        { $unwind: "$variants" },
        { $unwind: "$variants.stores" },
        { $sort: { "variants.stores.price": 1 } },
        {
          $group: {
            _id: {
              originalId: "$_id",
              variantId: "$variants.id",
            },
            originalDoc: { $first: "$$ROOT" },
            sortedStores: { $push: "$variants.stores" },
          },
        },
        { $unwind: { path: "$sortedStores", includeArrayIndex: "storeRank" } },
        { $match: { storeRank: { $lt: 3 } } },
        {
          $group: {
            _id: {
              storeId: "$sortedStores.store",
              rank: "$storeRank",
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.storeId",
            storeEntries: {
              $push: {
                rank: "$_id.rank",
                count: "$count",
                storeId: "$_id.storeId",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            storeId: { $arrayElemAt: ["$storeEntries.storeId", 0] },
            first: {
              $sum: {
                $map: {
                  input: "$storeEntries",
                  as: "entry",
                  in: {
                    $cond: [{ $eq: ["$$entry.rank", 0] }, "$$entry.count", 0],
                  },
                },
              },
            },
            second: {
              $sum: {
                $map: {
                  input: "$storeEntries",
                  as: "entry",
                  in: {
                    $cond: [{ $eq: ["$$entry.rank", 1] }, "$$entry.count", 0],
                  },
                },
              },
            },
            third: {
              $sum: {
                $map: {
                  input: "$storeEntries",
                  as: "entry",
                  in: {
                    $cond: [{ $eq: ["$$entry.rank", 2] }, "$$entry.count", 0],
                  },
                },
              },
            },
          },
        },
        {
          $sort: { first: -1, second: -1, third: -1, storeId: 1 },
        },
        { $skip: params.limit * (params.page - 1) },
        { $limit: params.limit },
      ],
    })) as unknown as StoreSummary;

    const stores = await payload.find({
      collection: "stores",
      depth: 0,
      where: {
        and: [
          {
            id: {
              in: data.map((d) => d.storeId),
            },
          },
        ],
      },
    });

    return res.json({
      data: data.map((d) => ({
        ...d,
        store: stores.docs.find((s) => s.id === d.storeId),
      })),
    });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
