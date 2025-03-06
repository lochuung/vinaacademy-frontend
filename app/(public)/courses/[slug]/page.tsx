import CourseHeader from '@/components/course/CourseHeader';
import CourseDetails from '@/components/course/CourseDetails';
import CourseReviews from '@/components/course/CourseReviews';
import PurchaseCard from '@/components/course/PurchaseCard';
import { Metadata } from 'next';
import Script from 'next/script';

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // In a real app, fetch data here based on slug
  const course = {
    name: "Lập trình Java cơ bản",
    description: "Khóa học giúp bạn nắm vững những kiến thức cơ bản về Java.",
    image: "/test.jpg",
  };
  
  return {
    title: `${course.name} | VinaAcademy`,
    description: course.description,
    openGraph: {
      title: `${course.name} | VinaAcademy`,
      description: course.description,
      images: [{ url: course.image, alt: course.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: course.name,
      description: course.description,
      images: [course.image],
    },
    alternates: {
      canonical: `https://vinaacademy.edu.vn/courses/${params.slug}`,
    }
  };
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  try {
    const course = {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "image": "/test.jpg",
      "name": "Lập trình Java cơ bản",
      "description": "Khóa học giúp bạn nắm vững những kiến thức cơ bản về Java.",
      "slug": "lap-trinh-java-co-ban",
      "price": 199.99,
      "level": "BEGINNER",
      "status": "PUBLISHED",
      "language": "Tiếng Việt",
      "category": {
        "id": 1,
        "name": "Lập trình",
        "slug": "lap-trinh",
        "parent": null
      },
      "rating": 4.8,
      "totalRating": 150,
      "totalStudent": 1200,
      "totalSection": 5,
      "totalLesson": 30,
      "sections": [
        {
          "id": 101,
          "name": "Giới thiệu về Java",
          "order": 1
        },
        {
          "id": 102,
          "name": "Cấu trúc điều khiển",
          "order": 2
        }
      ],
      "instructors": [
        {
          "id": 10,
          "name": "Nguyễn Văn A",
          "email": "nguyenvana@example.com",
          "isOwner": true,
          "avatarUrl": "/images/default-avatar.png" // Added avatar URL
        },
        {
          "id": 11,
          "name": "Trần Thị B",
          "email": "tranthib@example.com",
          "isOwner": false,
          "avatarUrl": "/images/default-avatar.png" // Added avatar URL
        }
      ],
      "courseReviews": [
        {
          "id": 3001,
          "userId": 2001,
          "rating": 5,
          "comment": "Khóa học rất bổ ích!",
          "avatarUrl": "/images/default-avatar.png" // Added avatar URL
        },
        {
          "id": 3002,
          "userId": 2002,
          "rating": 4,
          "comment": "Giảng viên dạy dễ hiểu.",
          "avatarUrl": "/images/default-avatar.png" // Added avatar URL
        }
      ] 
    };

    // Create structured data for the course
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.name,
      description: course.description,
      provider: {
        '@type': 'Organization',
        name: 'VinaAcademy',
        sameAs: 'https://vinaacademy.edu.vn'
      },
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: course.rating,
        reviewCount: course.totalRating
      },
      inLanguage: course.language === 'Tiếng Việt' ? 'vi' : 'en'
    };

    return (
      <>
        {/* JSON-LD Structured Data */}
        <Script
          id="course-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        
        <div className="bg-white min-h-screen">
          <main>
            {/* Course Header Banner Section */}
            <section className="bg-[#1c1d1f] text-white" aria-label="Thông tin khóa học">
              <CourseHeader course={course} />
            </section>
            
            {/* Main Content with Sidebar */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 relative">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content - 2/3 width on desktop */}
                <article className="lg:w-2/3">
                  <CourseDetails course={course} />
                  <CourseReviews reviews={course.courseReviews} rating={course.rating} totalRating={course.totalRating} />
                </article>
                
                {/* Purchase Sidebar - 1/3 width, sticky on desktop, hidden on mobile */}
                <aside className="lg:w-1/3 hidden lg:block">
                  <div className="sticky top-24">
                    <PurchaseCard course={course} />
                  </div>
                </aside>
              </div>
            </div>
          </main>
          
          {/* Mobile Purchase Bar - Fixed at bottom on mobile only */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 z-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{course.price.toLocaleString('vi-VN')}₫</p>
              </div>
              <button className="bg-[#a435f0] hover:bg-[#8710d8] text-white py-3 px-6 rounded font-medium">
                Đăng ký học ngay
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return <div className="text-center text-xl text-red-500">Lỗi khi tải khóa học!</div>;
  }
}
