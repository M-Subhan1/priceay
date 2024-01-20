import { Product } from "@/payload/payload-types";
import { env } from "../../../../env.mjs";
import { PayloadResponse } from "@/types";
import Perfumes from "@/ui/views/perfumes";

async function getData(params?: { pageNumber: string }) {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/products?where[]`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data as PayloadResponse<Product>;
}

interface Props {
  productData: Product[];
}

export default async function PerfumeMen(props: Props) {
  const products = await getData();

  return (
    <Perfumes
      slug="perfume-unisex"
      products={products.docs}
      pageCount={products.totalPages}
      currentPage={products.page}
    />
  );
}
