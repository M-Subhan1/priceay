import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const pagination = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const params = pagination.parse(req.query);
    const data = await prisma.products.aggregateRaw({
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
            store: { $first: "$sortedStores.name" },
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
          $lookup: {
            from: "stores", // The name of the new collection to join
            localField: "storeId", // Field from the original collection
            foreignField: "_id", // Field from the new collection to match
            as: "store", // The array field where joined documents will be placed
          },
        },
        { $skip: params.limit * (params.page - 1) },
        { $limit: params.limit },
      ],
    });

    return res.json({ data });
  }
}
