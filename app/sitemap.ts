

export default async function sitemap() {
    const baseUrl = "https://www.livezsport.com";

        
    const data = await fetch(`https://newsapi.org/v2/everything?q=football&from=${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()-3}&to=${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}&sortBy=popularity&pageSize=20&page=1&apiKey=${process.env.NEWS_API_KEY}`).then(res => {
        return res.json()
    })

    
    const res = data.articles.map((post: {
        publishedAt: any; title: any; 
}) => ({
        url: `${baseUrl}/News/${post.title}`,
        lastModified: post.publishedAt
    }))

    

        

    return [
        {url: baseUrl, lastModified: new Date()},
        {url: `${baseUrl}/Games`, lastModified: new Date()},
        {url: `${baseUrl}/News`, lastModified: new Date()},
        {url: `${baseUrl}/headtohead`, lastModified: new Date()},
        {url: `${baseUrl}/privacyPolicy`, lastModified: new Date()},
        {url: `${baseUrl}/termsAndConditions`, lastModified: new Date()},


        ...res

    ]
}