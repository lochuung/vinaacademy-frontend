"use client";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import { CustomImg } from "@/components/ui/markdownMD";

type MarkdownEditorProps = {
  setDescription: (value: string) => void;
  description?: string;
};

const MarkdownEditorSection = ({ setDescription, description }: MarkdownEditorProps) => {
  const [markdown, setMarkdown] = useState(description ||
    "## Đây là mô tả! Sử dụng markdown để trình bày nội dung của bạn."
  );
  const [mounted, setMounted] = useState(false);

  // Use effect to handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    // Return a placeholder with the same dimensions during SSR
    return <div className="h-64 w-full border rounded-md bg-gray-50"></div>;
  }
  return (
    <div className="container">
      {/* Pass custom options to MDEditor if available in its API */}
      <MDEditor
        value={markdown}
        style={{
          background: "white",
          color: "black",
          backgroundColor: "white",
        }}
        height={400}
        onChange={(value) => {
          setDescription(value || "");
          setMarkdown(value || "");
        }}
        previewOptions={{
          // This depends on the MDEditor API, adjust as needed
          rehypePlugins: [[rehypeSanitize]],
          style: { background: "white", color: "black" },
          components: {
            img: CustomImg,
          },
        }}
      />
      {/* <MarkdownMD markdown={markdown} /> */}
    </div>
  );
};

export default MarkdownEditorSection;
