'use client'
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

const CustomImg = (props: any) => {
  const src = props.src && props.src.trim() !== "" ? props.src : null;
  return src ? <img {...props} src={src} alt={props.alt || "Image"} /> : null;
};

const MarkdownMD = ({ markdown }: { markdown: string }) => {
  return (
    <MDEditor.Markdown
      source={markdown}
      style={{ background: "white", color: "black" }}
      className="mt-4 text-black"
      rehypePlugins={[rehypeSanitize]}
      components={{
        img: CustomImg,
      }}
    />
  );
};

export default  MarkdownMD ;
export { CustomImg };