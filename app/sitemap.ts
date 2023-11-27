export default async function sitemap() {
    const baseUrl = "https://www.livezsport.com";

    return [
        {url: baseUrl, lastModified: new Date()},
        {url: `${baseUrl}/Games`, lastModified: new Date()},
        {url: `${baseUrl}/News`, lastModified: new Date()},
        {url: `${baseUrl}/News/newspage`, lastModified: new Date()},
        {url: `${baseUrl}/headtohead`, lastModified: new Date()},
        {url: `${baseUrl}/privacyPolicy`, lastModified: new Date()},
        {url: `${baseUrl}/termsAndConditions`, lastModified: new Date()},
    ]
}