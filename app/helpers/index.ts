const getNews = async () => {
    const res = await fetch("https://newsapi.org/v2/everything?q=football&from=2023-11-05&to=2023-11-05&sortBy=popularity&pageSize=20&page=1&apiKey=b3b3280d1f9a4f6f88f746366c54d67d");

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json()
}

export const getSingleNews= async (data:String) => {
    const item = await getNews();
    const singleNews = await item.articles.find((news: any) => news.title === data)
    return singleNews;
}