import {siteConfig} from "@/config/site.config";
import {MetadataRoute} from "next";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // courses
    const courses = await fetch(`${siteConfig.apiUrl}/courses`);
    const coursesData = await courses.json();

    const courseUrls = coursesData.map((course: any) => ({
        url: `${siteConfig.url}/courses/${course.slug}`,
        lastModified: new Date(course.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));


    // Static pages
    const staticPages = [
        {
            url: siteConfig.url,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 1.0,
        },
        {
            url: `${siteConfig.url}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${siteConfig.url}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${siteConfig.url}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
    ];

    return [...staticPages, ...courseUrls];
}