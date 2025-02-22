// data/categories.ts
import { Category } from "@/types/navbar";

export const categoriesData: Category[] = [
    {
        name: "Lập trình",
        link: "/categories/programming",
        subCategories: [
            {
                name: "JavaScript",
                link: "/categories/programming/javascript",
                trendingTopics: [
                    {
                        name: "React.js",
                        link: "/topics/reactjs",
                        students: "50K+"
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
        name: "Thiết kế",
        link: "/categories/design",
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
        name: "Marketing",
        link: "/categories/marketing",
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
        name: "Kinh doanh",
        link: "/categories/business",
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

// Utility functions for categories
export const getCategoryByName = (name: string): Category | undefined => {
    return categoriesData.find(category => category.name === name);
};

export const getCategoryByLink = (link: string): Category | undefined => {
    return categoriesData.find(category => category.link === link);
};

export const getAllTrendingTopics = () => {
    const topics: Array<{
        name: string;
        link: string;
        students: string;
        category: string;
        subCategory: string;
    }> = [];

    categoriesData.forEach(category => {
        category.subCategories.forEach(subCategory => {
            subCategory.trendingTopics.forEach(topic => {
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