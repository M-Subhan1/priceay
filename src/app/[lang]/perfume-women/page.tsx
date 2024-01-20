import { Product } from "@/payload/payload-types";
import { env } from "../../../../env.mjs";
import { PayloadResponse } from "@/types";
import Perfumes from "@/ui/views/perfumes";

async function getData(params?: { page: string }) {
  const pageNumber = parseInt(params?.page || "1");

  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/products?limit=25&where[gender][equals]=Female${
      !isNaN(pageNumber) && `&page=${pageNumber}`
    }`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data as PayloadResponse<Product>;
}

interface Props {
  params: {
    page: string;
  };
}
export default async function Page(props: Props) {
  const products = await getData(props.params);

  return (
    <Perfumes
      slug="perfume-women"
      products={products.docs}
      pageCount={products.totalPages}
      currentPage={products.page}
    />
  );
}
