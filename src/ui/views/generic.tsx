import { ContactUs } from "@/payload/payload-types";
import { richTextToHtml } from "@/utils/richTextToHTML";

export default function MarkdownView({
  content,
}: {
  content: ContactUs["content"];
  lang: string;
}) {
  return (
    <main className="container mx-auto px-4 singlepage">
      {richTextToHtml(content)}
    </main>
  );
}
