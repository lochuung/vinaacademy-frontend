import {siteConfig} from "@/config/site.config";
import {MetadataRoute} from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Base URL for API calls - ensure it's an absolute URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
    
    try {
        // courses - use the absolute API URL
        const coursesResponse = await fetch(`${baseUrl}/courses`);
        
        if (!coursesResponse.ok) {
            console.warn('Failed to fetch courses for sitemap:', coursesResponse.statusText);
            return getStaticPages(); // Return only static pages if courses can't be fetched
        }
        
        const coursesData = await coursesResponse.json();
        
        const courseUrls = coursesData.map((course: any) => ({
            url: `${siteConfig.url}/courses/${course.slug}`,
            lastModified: new Date(course.updatedAt || Date.now()),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));
        
        return [...getStaticPages(), ...courseUrls];
    } catch (error) {
        console.warn('Error generating sitemap:', error);
        return getStaticPages(); // Fallback to static pages on error
    }
}

// Static pages function for reuse
function getStaticPages() {
    return [
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
}