import { codeToHtml } from "shiki";
import CodeBlockToggle from "./CodeBlockToggle";

type CodeBlockProps = {
  code: string;
  lang?: string;
};

export default async function CodeBlock({ code, lang = "typescript" }: CodeBlockProps) {
  const highlightedHtml = await codeToHtml(code, {
    lang,
    theme: "github-dark",
  });

  return <CodeBlockToggle highlightedHtml={highlightedHtml} />;
}
