import escapeHTML from "escape-html";
import Link from "next/link";
import { Fragment } from "react";
import { Text } from "slate";

export const richTextToHtml = (children: any[]) => {
  return children.map((node, i) => {
    if (Text.isText(node)) {
      let text = (
        <span
          dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }}
        ></span>
      );

      node = node as any;

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.underline) {
        text = <u key={i}>{text}</u>;
      }

      if (node.strikethrough) {
        text = <del key={i}>{text}</del>;
      }

      if (node.code) {
        text = <code key={i}>{text}</code>;
      }

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case "h1":
        return <h1 key={i}>{richTextToHtml(node.children)}</h1>;
      case "h2":
        return <h2 key={i}>{richTextToHtml(node.children)}</h2>;
      case "h3":
        return <h3 key={i}>{richTextToHtml(node.children)}</h3>;
      case "h4":
        return <h4 key={i}>{richTextToHtml(node.children)}</h4>;
      case "h5":
        return <h5 key={i}>{richTextToHtml(node.children)}</h5>;
      case "h6":
        return <h6 key={i}>{richTextToHtml(node.children)}</h6>;
      case "blockquote":
        return <blockquote key={i}>{richTextToHtml(node.children)}</blockquote>;
      case "ul":
        return <ul key={i}>{richTextToHtml(node.children)}</ul>;
      case "ol":
        return <ol key={i}>{richTextToHtml(node.children)}</ol>;
      case "li":
        return <li key={i}>{richTextToHtml(node.children)}</li>;
      case "link":
        return (
          <Link
            href={escapeHTML(node.url)}
            target={node.newTab ? `_blank` : `_self`}
            key={i}
          >
            {richTextToHtml(node.children)}
          </Link>
        );

      default:
        return <p key={i}>{richTextToHtml(node.children)}</p>;
    }
  });
};
