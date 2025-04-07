// data/categories.ts
import {Category} from "@/types/navbar";

// Mảng chứa dữ liệu các danh mục với thông tin chi tiết, bao gồm các danh mục con và chủ đề thịnh hành
export const categoriesData: Category[] = [
    {
        name: "Lập trình",                      // Tên danh mục
        link: "/categories/programming",         // Đường dẫn đến trang danh mục "Lập trình"
        description: "Khám phá thế giới lập trình với các khóa học từ cơ bản đến nâng cao", // Mô tả danh mục
        coursesCount: 150,                       // Số lượng khóa học trong danh mục
        subCategories: [                         // Danh sách các danh mục con của "Lập trình"
            {
                name: "JavaScript",              // Tên danh mục con
                link: "/categories/programming/javascript", // Đường dẫn danh mục con JavaScript
                trendingTopics: [                // Danh sách các chủ đề thịnh hành trong JavaScript
                    {
                        name: "React.js",        // Tên chủ đề
                        link: "/topics/reactjs", // Đường dẫn liên kết đến chủ đề
                        students: "50K+"         // Số lượng học viên hoặc mức độ quan tâm
                    },
                    {
                        name: "Next.js",
                        link: "/topics/nextjs",
                        students: "30K+"
                    },
                    {
                        name: "Node.js",
                        link: "/topics/nodejs",
                        students: "40K+"
                    },
                ]
            },
            {
                name: "Python",
                link: "/categories/programming/python",
                trendingTopics: [
                    {
                        name: "Machine Learning",
                        link: "/topics/ml",
                        students: "45K+"
                    },
                    {
                        name: "Django",
                        link: "/topics/django",
                        students: "25K+"
                    },
                    {
                        name: "Data Science",
                        link: "/topics/data-science",
                        students: "35K+"
                    },
                ]
            },
            {
                name: "Java",
                link: "/categories/programming/java",
                trendingTopics: [
                    {
                        name: "Spring Boot",
                        link: "/topics/spring",
                        students: "30K+"
                    },
                    {
                        name: "Android Dev",
                        link: "/topics/android",
                        students: "40K+"
                    },
                ]
            }
        ]
    },
    {
        name: "Thiết kế",                       // Danh mục: Thiết kế
        link: "/categories/design",
        description: "Học thiết kế chuyên nghiệp với các công cụ và xu hướng mới nhất", // Mô tả danh mục
        coursesCount: 80,                        // Số lượng khóa học trong danh mục
        subCategories: [
            {
                name: "UI/UX Design",
                link: "/categories/design/ui-ux",
                trendingTopics: [
                    {
                        name: "Figma Master",
                        link: "/topics/figma",
                        students: "35K+"
                    },
                    {
                        name: "Design System",
                        link: "/topics/design-system",
                        students: "20K+"
                    },
                ]
            },
            {
                name: "Graphic Design",
                link: "/categories/design/graphic",
                trendingTopics: [
                    {
                        name: "Adobe Photoshop",
                        link: "/topics/photoshop",
                        students: "45K+"
                    },
                    {
                        name: "Illustrator",
                        link: "/topics/illustrator",
                        students: "30K+"
                    },
                ]
            }
        ]
    },
    {
        name: "Marketing",                      // Danh mục: Marketing
        link: "/categories/marketing",
        description: "Phát triển kỹ năng marketing trong thời đại số", // Mô tả danh mục
        coursesCount: 95,                        // Số lượng khóa học trong danh mục
        subCategories: [
            {
                name: "Digital Marketing",
                link: "/categories/marketing/digital",
                trendingTopics: [
                    {
                        name: "SEO Mastery",
                        link: "/topics/seo",
                        students: "38K+"
                    },
                    {
                        name: "Google Ads",
                        link: "/topics/google-ads",
                        students: "32K+"
                    },
                ]
            },
            {
                name: "Content Marketing",
                link: "/categories/marketing/content",
                trendingTopics: [
                    {
                        name: "Copywriting",
                        link: "/topics/copywriting",
                        students: "28K+"
                    },
                    {
                        name: "Social Media",
                        link: "/topics/social-media",
                        students: "42K+"
                    },
                ]
            }
        ]
    },
    {
        name: "Kinh doanh",                     // Danh mục: Kinh doanh
        link: "/categories/business",
        description: "Kiến thức và kỹ năng thiết yếu cho người làm kinh doanh", // Mô tả danh mục
        coursesCount: 120,                       // Số lượng khóa học trong danh mục
        subCategories: [
            {
                name: "Khởi nghiệp",
                link: "/categories/business/startup",
                trendingTopics: [
                    {
                        name: "Business Model",
                        link: "/topics/business-model",
                        students: "25K+"
                    },
                    {
                        name: "Gọi vốn",
                        link: "/topics/fundraising",
                        students: "20K+"
                    },
                ]
            },
            {
                name: "Quản lý",
                link: "/categories/business/management",
                trendingTopics: [
                    {
                        name: "Leadership",
                        link: "/topics/leadership",
                        students: "35K+"
                    },
                    {
                        name: "Project Management",
                        link: "/topics/project-management",
                        students: "30K+"
                    },
                ]
            }
        ]
    }
];

// Các hàm tiện ích xử lý danh mục

// Lấy một danh mục dựa trên tên của nó
export const getCategoryByName = (name: string): Category | undefined => {
    return categoriesData.find(category => category.name === name);
};

// Lấy một danh mục dựa trên đường dẫn của nó
export const getCategoryByLink = (link: string): Category | undefined => {
    return categoriesData.find(category => category.link === link);
};

// Lấy danh sách tất cả các chủ đề thịnh hành từ các danh mục và danh mục con
export const getAllTrendingTopics = () => {
    // Tạo mảng rỗng chứa thông tin chủ đề thịnh hành, kèm theo thông tin danh mục và danh mục con liên quan
    const topics: Array<{
        name: string;
        link: string;
        students: string;
        category: string;
        subCategory: string;
    }> = [];

    // Duyệt qua từng danh mục
    categoriesData.forEach(category => {
        // Duyệt qua từng danh mục con của danh mục
        category.subCategories.forEach(subCategory => {
            // Duyệt qua từng chủ đề thịnh hành của danh mục con
            subCategory.trendingTopics.forEach(topic => {
                // Thêm chủ đề vào mảng kèm theo thông tin danh mục và danh mục con
                topics.push({
                    ...topic,
                    category: category.name,
                    subCategory: subCategory.name
                });
            });
        });
    });

    return topics;
};