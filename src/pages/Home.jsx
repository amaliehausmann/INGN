import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { allNews } from "../queries/allNews";
import { NewsCard } from "../components/NewsCard/NewsCard";
import { Link } from "react-router-dom";

export const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allNews"],
    queryFn: async () => request(import.meta.env.VITE_PUBLIC_ENDPOINT, allNews),
  });

  if (isLoading) {
    return <p>Loading news...</p>;
  }

  if (error) {
    return <p>Error loading news: {error.message}</p>;
  }

  return (
    <section>
      {data.newscards.map((item) => (
        <NewsCard
          title={item.header}
          content={item.content.substring(0, 100) + "..."}
          date={item.date}
          writer={item.writer}
          imageSRC={item.image[0]?.url}
        >
            <Link to={`./singlenews/${item.slug}`}>Læs mere</Link>
        </NewsCard>
      ))}
    </section>
  );
};
