// components/course-creator/sections/BasicInfoSection.tsx
"use client";
import { CourseData } from "@/types/new-course";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useState, useEffect } from "react";
import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";
import { CustomImg } from "@/components/ui/markdownMD";
import MarkdownMD from "@/components/ui/markdownMD";

const MarkdownEditorSection = () => {
  const [markdown, setMarkdown] = useState("## Hello Markdown!");
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
        onChange={(value) => setMarkdown(value || "")}
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

interface BasicInfoSectionProps {
  courseData: CourseData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onEditorChange: (e: EditorTextChangeEvent) => void;
}

export default function BasicInfoSection({
  courseData,
  onChange,
  onEditorChange,
}: BasicInfoSectionProps) {
  // Configure Editor to prevent empty src attributes

  return (
    <div className="p-6 space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tên khóa học <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3"
          placeholder="Ví dụ: Lập trình Web với React và Node.js"
          value={courseData.title}
          onChange={onChange}
        />
        <p className="mt-2 text-sm text-gray-500">
          Đặt tên dễ hiểu và hấp dẫn để thu hút học viên (60-100 ký tự)
        </p>
      </div>

      <div>
        <label
          htmlFor="subtitle"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mô tả ngắn
        </label>
        <input
          type="text"
          name="subtitle"
          id="subtitle"
          className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3"
          placeholder="Mô tả ngắn gọn về khóa học"
          value={courseData.subtitle}
          onChange={onChange}
        />
        <p className="mt-2 text-sm text-gray-500">
          Mô tả ngắn gọn về những gì học viên sẽ học được (120-160 ký tự)
        </p>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mô tả chi tiết <span className="text-red-500">*</span>
        </label>
        {/* <Editor
          id="description"
          name="description"
          style={{ height: "250px" }}
          required
          className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3"
          placeholder="Mô tả chi tiết về nội dung khóa học, đối tượng học viên, kết quả đạt được..."
          value={courseData.description}
          onTextChange={onEditorChange}
          // Add any available options to prevent empty src
          // props depend on your specific version of primereact/editor
        /> */}

        {/* Client-side only Markdown editor section */}
        <MarkdownEditorSection />
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Danh mục <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3"
            value={courseData.category}
            onChange={onChange}
          >
            <option value="">Chọn danh mục</option>
            <option value="web-development">Lập trình Web</option>
            <option value="mobile-development">Lập trình Mobile</option>
            <option value="data-science">Data Science</option>
            <option value="ui-ux">UI/UX Design</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Trình độ <span className="text-red-500">*</span>
          </label>
          <select
            id="level"
            name="level"
            required
            className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3"
            value={courseData.level}
            onChange={onChange}
          >
            <option value="">Chọn trình độ</option>
            <option value="beginner">Người mới bắt đầu</option>
            <option value="intermediate">Trung cấp</option>
            <option value="advanced">Nâng cao</option>
            <option value="all-levels">Tất cả trình độ</option>
          </select>
        </div>
      </div>
    </div>
  );
}
