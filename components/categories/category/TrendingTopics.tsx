// components/TrendingTopics.tsx
import Link from "next/link";

interface TrendingTopic {
    name: string;
    link: string;
    students: string;
}

interface TrendingTopicsProps {
    topics: TrendingTopic[];
    category: string;
    subcategory?: string;
    categoryData: any;
}

export function TrendingTopics({topics, category, subcategory, categoryData}: TrendingTopicsProps) {
    if (topics.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Chủ đề phổ biến</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topics.map((topic, index) => {
                    // Lấy topic slug từ đường dẫn
                    const topicSlug = topic.link.split('/').pop();

                    // Xác định đường dẫn
                    let topicUrl;
                    if (subcategory) {
                        // Nếu đang ở trang danh mục con, sử dụng URL với tham số truy vấn topic
                        topicUrl = `/categories/${category}/${subcategory}?topic=${topicSlug}`;
                    } else {
                        // Nếu đang ở trang danh mục chính, tìm danh mục con chứa chủ đề này
                        let targetSubCategory;

                        // Duyệt qua tất cả danh mục con để tìm chủ đề
                        if (categoryData && categoryData.subCategories) {
                            for (const subCat of categoryData.subCategories) {
                                if (subCat.trendingTopics) {
                                    const foundTopic = subCat.trendingTopics.find((t: {
                                        name: string
                                    }) => t.name === topic.name);
                                    if (foundTopic) {
                                        const subCategorySlug = subCat.link.split('/').pop();
                                        targetSubCategory = subCategorySlug;
                                        break;
                                    }
                                }
                            }
                        }

                        // Nếu tìm thấy danh mục con chứa chủ đề, tạo URL với tham số truy vấn topic
                        if (targetSubCategory) {
                            topicUrl = `/categories/${category}/${targetSubCategory}?topic=${topicSlug}`;
                        } else {
                            // Fallback: Sử dụng URL chủ đề nếu không tìm thấy danh mục con
                            topicUrl = topic.link;
                        }
                    }

                    return (
                        <Link
                            key={index}
                            href={topicUrl}
                            className="flex flex-col items-center p-4 border rounded-md hover:bg-gray-50"
                        >
                            <div className="text-center">
                                <h3 className="font-medium">{topic.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{topic.students} học viên</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}