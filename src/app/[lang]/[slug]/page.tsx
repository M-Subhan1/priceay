import MarkdownView from "@/ui/views/generic";
import { env } from "../../../../env.mjs";
import { StoresList } from "@/payload/payload-types";

const allowedSlugs = [
  "contact-us",
  "privacy-policy",
  "stores-list",
  "terms-and-conditions",
];

async function getData(slug: string) {
  if (!allowedSlugs.includes(slug)) {
    return null;
  }

  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/globals/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data as StoresList;
}

export default async function Page(props: {
  params: {
    slug: string;
    lang: string;
  };
}) {
  const data = await getData(props.params.slug);

  if (!data?.content) {
    return (
      <main className="container mx-auto">
        <h2 className="text-center text-2xl mt-12">Page Does not Exist</h2>
      </main>
    );
  }

  return <MarkdownView content={data?.content} lang={props.params.lang} />;
}
