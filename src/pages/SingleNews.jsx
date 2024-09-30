import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useParams } from "react-router-dom"
import { singleNews } from "../queries/singleNews";
import { NewsCard } from "../components/NewsCard/NewsCard";

export const SingleNews = () => {
    const {newsslug} = useParams();

    const {data, isLoading, error} = useQuery({
        queryKey: ["singleNews"],
        queryFn: async () => request(import.meta.env.VITE_PUBLIC_ENDPOINT, singleNews, {newsslug: newsslug})
    })

    if (isLoading) {
        return <p>News is loading...</p>
    }

    if (error) {
        return <p>Error loading news: {error.message}</p>
    }


  return (
    <div>
        <NewsCard
        title={data.newscard.header}
        content={data.newscard.content}
        date={data.newscard.date}
        writer={data.newscard.writer}
        imageSRC={data.newscard.image[0]?.url}
        >
        </NewsCard>
    </div>
  )
}