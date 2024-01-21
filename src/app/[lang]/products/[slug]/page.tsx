import { Product } from "@/payload/payload-types";
import { env } from "../../../../../env.mjs";
import ProductDetails from "@/ui/views/product-details";
import { PayloadResponse } from "@/types";

async function getData(params: { slug: string }) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/products?limit=1&where[slug][equals]=${params.slug}&page=1&depth=2`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data as PayloadResponse<Product>;
}

interface Props {
  params: {
    slug: string;
  };
}
export default async function Page(props: Props) {
  const products = await getData(props.params);
  const product = products.docs?.at(0);

  if (!product) {
    return (
      <div className="container mx-auto">
        <h1 className="text-center text-xl">Product Not Found</h1>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
