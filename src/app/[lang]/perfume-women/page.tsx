import { Product } from "@/payload/payload-types";
import { env } from "../../../../env.mjs";
import { PayloadResponse } from "@/types";
import Perfumes from "@/ui/views/perfumes";

interface Props {
  params: {
    page: string | undefined;
  };
}

async function getData(params?: { page?: string }) {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/products?where[]`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data as PayloadResponse<Product>;
}

export default async function Page({ params: { page } }: Props) {
  const products = await getData({
    page,
  });

  return (
    <Perfumes
      slug="perfume-women"
      products={products.docs}
      pageCount={products.totalPages}
      currentPage={products.page}
    />
  );
}
