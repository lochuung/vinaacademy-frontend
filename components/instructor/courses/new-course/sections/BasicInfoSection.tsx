// components/course-creator/sections/BasicInfoSection.tsx
"use client";
import { CourseData } from "@/types/new-course";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useState, useEffect } from "react";
import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";
import MarkdownMD from "@/components/ui/markdownMD";
import { existCourseBySlug } from "@/services/courseService";
import MarkdownEditorSection from "@/components/instructor/courses/new-course/MarkdownEditor";
import { Input } from "@/components/ui/input";

interface BasicInfoSectionProps {
  courseData: CourseData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onEditorChange: (e: EditorTextChangeEvent) => void;
}

interface ValidationErrors {
  title?: string;
  subtitle?: string;
  slug?: string;
  description?: string;
  category?: string;
  level?: string;
}

export default function BasicInfoSection({
  courseData,
  onChange,
  onEditorChange,
}: BasicInfoSectionProps) {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugDebounceTimeout, setSlugDebounceTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const handleDescriptionChange = (value: string) => {
    validateField("description", value);
    courseData.description = value;
  };

  // Function to validate form fields
  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "title":
        if (!value.trim()) {
          newErrors.title = "Tên khóa học không được để trống";
        } else if (value.length > 70) {
          newErrors.title = "Tên khóa học không được vượt quá 70 ký tự";
        } else {
          delete newErrors.title;
        }
        break;

      case "subtitle":
        if (!value.trim()) {
          newErrors.subtitle = "Mô tả ngắn không được để trống";
        } else if (value.length > 160) {
          newErrors.subtitle = "Mô tả ngắn không được vượt quá 160 ký tự";
        } else {
          delete newErrors.subtitle;
        }
        break;
      case "description":
        if (!value.trim()) {
          newErrors.description = "Mô tả chi tiết không được trống";
        }  else {
          delete newErrors.description;
        }
        break;

      case "slug":
        if (!value.trim()) {
          newErrors.slug = "Slug không được để trống";
        } else if (!/^[a-z0-9-]+$/.test(value)) {
          newErrors.slug =
            "Slug chỉ được chứa chữ thường, số và dấu gạch ngang";
        } else {
          delete newErrors.slug;

          // Debounce the slug existence check
          if (slugDebounceTimeout) {
            clearTimeout(slugDebounceTimeout);
          }

          setSlugDebounceTimeout(
            setTimeout(async () => {
              setIsCheckingSlug(true);
              const resultCheck = await existCourseBySlug(value);
              setIsCheckingSlug(false);
              console.log("Slug check result:", resultCheck);
              if (resultCheck) {
                setErrors((prev) => ({
                  ...prev,
                  slug: "Slug này đã tồn tại, vui lòng chọn slug khác",
                }));
              }
            }, 500)
          );
        }
        break;

      case "category":
      case "level":
        if (!value) {
          newErrors[name] = "Trường này không được để trống";
        } else {
          delete newErrors[name];
        }
        break;
    }

    setErrors(newErrors);
  };

  // Handle input change with validation
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    validateField(name, value);
    onChange(e);
  };

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
          className={`shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3 ${
            errors.title ? "border-red-500" : ""
          }`}
          placeholder="Ví dụ: Lập trình Web với React và Node.js"
          value={courseData.title}
          onChange={handleChange}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          Đặt tên dễ hiểu và hấp dẫn để thu hút học viên (tối đa 100 ký tự)
        </p>
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Slug <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center">
          <input
            type="text"
            name="slug"
            id="slug"
            required
            className={`shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3 ${
              errors.slug ? "border-red-500" : ""
            }`}
            placeholder="lap-trinh-web-voi-react"
            value={courseData.slug || ""}
            onChange={handleChange}
          />
          {isCheckingSlug && (
            <div className="ml-2">
              <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
        {errors.slug && (
          <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          URL duy nhất cho khóa học của bạn (chỉ sử dụng chữ thường, số và dấu
          gạch ngang)
        </p>
      </div>

      <div>
        <label
          htmlFor="subtitle"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mô tả ngắn <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="subtitle"
          id="subtitle"
          required
          className={`shadow-sm focus:ring-black focus:border-y-sky-500 block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3 ${
            errors.subtitle ? "border-red-500" : ""
          }`}
          placeholder="Mô tả ngắn gọn về khóa học"
          value={courseData.subtitle}
          onChange={handleChange}
        />
        {errors.subtitle && (
          <p className="mt-1 text-sm text-red-600">{errors.subtitle}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          Mô tả ngắn gọn về những gì học viên sẽ học được (tối đa 160 ký tự)
        </p>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mô tả chi tiết <span className="text-red-500">*</span>
        </label>

        {/* Client-side only Markdown editor section */}
        <MarkdownEditorSection setDescription={handleDescriptionChange} />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
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
            className={`shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3 ${
              errors.category ? "border-red-500" : ""
            }`}
            value={courseData.category}
            onChange={handleChange}
          >
            <option value="">Chọn danh mục khóa học</option>
            <option value="web-development">Lập trình Web</option>
            <option value="mobile-development">Lập trình Mobile</option>
            <option value="data-science">Data Science</option>
            <option value="ui-ux">UI/UX Design</option>
            <option value="marketing">Marketing</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
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
            className={`shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md bg-white text-gray-900 p-3 ${
              errors.level ? "border-red-500" : ""
            }`}
            value={courseData.level}
            onChange={handleChange}
          >
            <option value="">Chọn trình độ khóa học</option>
            <option value="beginner">Người mới bắt đầu</option>
            <option value="intermediate">Trung cấp</option>
            <option value="advanced">Nâng cao</option>
          </select>
          {errors.level && (
            <p className="mt-1 text-sm text-red-600">{errors.level}</p>
          )}
        </div>
      </div>
    </div>
  );
}
