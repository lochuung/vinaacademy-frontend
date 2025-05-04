"use client";
import { CourseData } from "@/types/new-course";
import { EditorTextChangeEvent } from "primereact/editor";
import { useState, useEffect } from "react";
import { getCategories } from "@/services/categoryService";
import { CategoryDto } from "@/types/category";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import InfoAlert from "../new-course/InfoAlert";
import FormField from "@/components/ui/form/FormField";
import ProgressIndicator from "@/components/ui/form/ProgressIndicator";
import CategorySelect from "@/components/ui/form/CategorySelect";
import { useDebounce } from "@/hooks/useDebounce";
import TipTapEditor from "@/components/common/editors/TipTapEditor";

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
  // Local state for input values to improve responsiveness
  const [localValues, setLocalValues] = useState({
    title: courseData.title || "",
    description: courseData.description || "",
    category: courseData.category || "",
    level: courseData.level || "",
    language: courseData.language || "Tiếng việt"
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  // Update local values when courseData changes (important for edit mode)
  useEffect(() => {
    setLocalValues({
      title: courseData.title || "",
      description: courseData.description || "",
      category: courseData.category || "",
      level: courseData.level || "",
      language: courseData.language || "Tiếng việt"
    });
  }, [courseData]);

  // Debounce the values to avoid excessive validation/state updates
  const debouncedTitle = useDebounce(localValues.title, 300);
  const debouncedDescription = useDebounce(localValues.description, 500);

  // Apply validated values to the parent component
  useEffect(() => {
    if (debouncedTitle !== courseData.title) {
      const event = {
        target: { name: 'title', value: debouncedTitle }
      } as React.ChangeEvent<HTMLInputElement>;
      validateField("title", debouncedTitle);
      onChange(event);
    }
  }, [debouncedTitle]);

  useEffect(() => {
    if (debouncedDescription !== courseData.description) {
      validateField("description", debouncedDescription);
      // Create an editor change event to pass to the parent
      const editorEvent = {
        htmlValue: debouncedDescription,
        textValue: debouncedDescription,
        source: 'user'
      } as EditorTextChangeEvent;
      onEditorChange(editorEvent);
    }
  }, [debouncedDescription]);

  const handleDescriptionChange = (value: string) => {
    setLocalValues(prev => ({ ...prev, description: value }));
  };

  const loadCategories = async () => {
    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

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
        } else {
          delete newErrors.description;
        }
        break;

      case "category":
      case "level":
        if (!value) {
          newErrors[name] = `${name === "category" ? "Danh mục" : "Trình độ"} không được để trống`;
        } else {
          delete newErrors[name];
        }
        break;
    }

    setErrors(newErrors);
  };

  // Handle input change for local state first (feels more responsive)
  const handleLocalChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Update local state immediately for responsive UI
    setLocalValues(prev => ({ ...prev, [name]: value }));

    // For select inputs (category, level), update parent state immediately
    // as they don't typically suffer from typing lag
    if (name === 'category' || name === 'level') {
      validateField(name, value);
      onChange(e);
    }
  };

  return (
    <motion.div
      className="p-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <InfoAlert
        title="Chỉnh sửa thông tin khóa học"
        icon={<FileText className="h-6 w-6 text-blue-500" />}
        variant="blue"
      >
        <p>
          Cập nhật thông tin khóa học để giúp học viên tìm kiếm và hiểu rõ hơn về khóa học của bạn. Tên khóa học hấp dẫn và mô tả chi tiết sẽ giúp thu hút học viên.
        </p>
      </InfoAlert>

      <div className="space-y-6">
        <FormField
          label="Tên khóa học"
          name="title"
          required
          error={errors.title}
          successMessage={localValues.title && !errors.title ? "Tên khóa học phù hợp" : undefined}
          helperText="Đặt tên dễ hiểu và hấp dẫn để thu hút học viên (tối đa 70 ký tự)"
          characterCount={localValues.title ? { current: localValues.title.length, max: 70 } : undefined}
        >
          <input
            type="text"
            name="title"
            id="title"
            required
            className={`shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-base border-gray-300 rounded-md bg-white text-gray-900 p-3 ${errors.title ? "border-red-500" : ""
              }`}
            placeholder="Ví dụ: Lập trình Web với React và Node.js"
            value={localValues.title}
            onChange={handleLocalChange}
          />
        </FormField>

        <FormField
          label="Mô tả chi tiết"
          name="description"
          required
          error={errors.description}
          helperText="Mô tả chi tiết về nội dung khóa học, những gì học viên sẽ học được, và lợi ích khi tham gia khóa học"
        >
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <TipTapEditor
              content={localValues.description}
              onChange={handleDescriptionChange}
              placeholder="Nhập mô tả chi tiết tại đây..."
              editable={true}
            />
          </div>
        </FormField>

        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <FormField
            label="Danh mục"
            name="category"
            required
            error={errors.category}
            helperText="Lựa chọn danh mục phù hợp nhất với nội dung khóa học của bạn"
          >
            <CategorySelect
              categories={categories}
              value={localValues.category}
              onChange={handleLocalChange}
              error={!!errors.category}
            />
          </FormField>

          <FormField
            label="Trình độ"
            name="level"
            required
            error={errors.level}
            helperText="Chọn trình độ phù hợp với đối tượng học viên mục tiêu"
          >
            <select
              id="level"
              name="level"
              required
              className={`shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-base border-gray-300 rounded-md bg-white text-gray-900 p-3 ${errors.level ? "border-red-500" : ""
                }`}
              value={localValues.level}
              onChange={handleLocalChange}
            >
              <option value="">Chọn trình độ khóa học</option>
              <option value="BEGINNER">Người mới bắt đầu</option>
              <option value="INTERMEDIATE">Trung cấp</option>
              <option value="ADVANCED">Nâng cao</option>
            </select>
          </FormField>
        </div>

        <FormField
          label="Ngôn ngữ giảng dạy"
          name="language"
          required
          helperText="Chọn ngôn ngữ sử dụng trong khóa học"
        >
          <select
            id="language"
            name="language"
            required
            className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-base border-gray-300 rounded-md bg-white text-gray-900 p-3"
            value={localValues.language || "Tiếng việt"}
            onChange={handleLocalChange}
          >
            <option value="Tiếng việt">Tiếng Việt</option>
            <option value="English">Tiếng Anh</option>
            <option value="Japanese">Tiếng Nhật</option>
            <option value="Korean">Tiếng Hàn</option>
          </select>
        </FormField>
      </div>

      {/* Summary of completed fields */}
      <ProgressIndicator
        title="Tiến trình thông tin cơ bản"
        items={[
          { label: "Tên khóa học", isCompleted: !!courseData.title, step: 1 },
          { label: "Mô tả chi tiết", isCompleted: !!courseData.description, step: 2 },
          { label: "Danh mục", isCompleted: !!courseData.category, step: 3 },
          { label: "Trình độ", isCompleted: !!courseData.level, step: 4 },
          { label: "Ngôn ngữ", isCompleted: !!courseData.language, step: 5 },
        ]}
      />
    </motion.div>
  );
}