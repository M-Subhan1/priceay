import { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import getPayloadClient from "../../payload/payloadClient";
import slugify from "slugify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = await getPayloadClient();

  if (req.method === "POST") {
    await Promise.all(
      Array.from({ length: 20 }).map(() => {
        const name = faker.company.name();
        payload.create({
          collection: "brands",
          data: {
            name,
            slug: slugify(name, {
              lower: true,
            }),
            startsWith: name[0].toUpperCase(),
          },
        });
      })
    );

    // for (let i = 0; i < 10; i++) {
    //   await payload.create({
    //     collection: "stores",
    //     data: {
    //       name: faker.company.name(),
    //       storeImage: faker.image.url(),
    //       url: faker.internet.url(),
    //     },
    //   });
    // }
  } else if (req.method === "GET") {
    const stores = await payload.find({
      collection: "stores",
    });

    const brands = await payload.find({
      collection: "brands",
      limit: 100,
    });

    return res.json({ stores, brands });
  }

  return res.json({
    complete: true,
  });
}
