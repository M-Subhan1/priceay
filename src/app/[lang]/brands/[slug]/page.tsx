import ProductCard from "@/components/ProductCard";
import { Brand, Product } from "@/payload/payload-types";
import { env } from "../../../../../env.mjs";
import { PayloadResponse } from "@/types";
import { Metadata } from "next";

async function getBrand({ slug }: { slug: string }) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/brands/?limit=1&where[slug][equals]=${slug}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data as PayloadResponse<Brand>;
}

async function getProducts(params: { page?: string; brandId?: string }) {
  if (!params?.brandId) return undefined;

  const pageNumber = parseInt(params?.page || "1");

  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/products?limit=25&where[brand][equals]=${
      params.brandId
    }${!isNaN(pageNumber) && `&page=${pageNumber}`}`
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
    slug: string;
    lang: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const brand = (await getBrand({ slug: params.slug })).docs[0] as
    | Brand
    | undefined;

  return {
    title: `Priceay ${brand?.name && `- ${brand.name}`}`,
    openGraph: {
      title: `Priceay ${brand?.name && `- ${brand.name}`}`,
      url: `${env.NEXT_PUBLIC_APP_URL}/${params.slug}/brands/${params.slug}`,
    },
  } as Metadata;
}

export default async function Products({ params }: Props) {
  const brand = (await getBrand({ slug: params.slug })).docs[0] as
    | Brand
    | undefined;

  const products = await getProducts({ brandId: brand?.id });

  if (!products?.docs.length) {
    return <div className="text-center text-2xl"> No Products Found</div>;
  }

  return (
    <>
      <div className="px-4">
        {brand?.name && <h1 className="text-2xl my-4">{brand.name}</h1>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 justify-center items-center mx-auto">
          {Array.from({ length: 25 }).map((_, idx) => (
            <ProductCard product={products.docs[0]!} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}
