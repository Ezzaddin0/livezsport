

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

  const date = new Date();
  const match = await fetch(`https://v3.football.api-sports.io/fixtures?date=${date.getFullYear()}-${date.getMonth()+1 < 10 ? "0"+ date.getMonth()+1 : date.getMonth()+1}-${date.getDate() < 10 ? "0"+ date.getDate() : date.getDate()}`, {
      "method": "GET",
      "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`
      }
  })
  const resMatch = await match.json()
  

  const resMa = resMatch.response.map((data: {
      fixture: any;
    id: any; date: any; 
}) => ({
    url: `${baseUrl}/Games/${data.fixture.id}`,
    lastModified: data.fixture.date
}))
    

        

    return [
        {url: baseUrl, lastModified: new Date()},
        {url: `${baseUrl}/Games`, lastModified: new Date()},
        {url: `${baseUrl}/News`, lastModified: new Date()},
        {url: `${baseUrl}/headtohead`, lastModified: new Date()},
        {url: `${baseUrl}/privacyPolicy`, lastModified: new Date()},
        {url: `${baseUrl}/termsAndConditions`, lastModified: new Date()},


        ...res,
        ...resMa

    ]
}