import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { allNews } from "../queries/allNews";
import { NewsCard } from "../components/NewsCard/NewsCard";
import { Link, useOutletContext } from "react-router-dom";
import { NewsContainer } from "../components/NewsContainer/NewsContainer";

export const Home = () => {
  const { selectedCategory } = useOutletContext();


  const { data, isLoading, error } = useQuery({
    queryKey: ["allNews", selectedCategory],
    queryFn: async () => request(import.meta.env.VITE_PUBLIC_ENDPOINT, allNews),
  });

  if (isLoading) {
    return <p>Loading news...</p>;
  }

  if (error) {
    return <p>Error loading news: {error.message}</p>;
  }

  const filteredNews =
    selectedCategory && selectedCategory !== "alle"
      ? data.newscards.filter((item) => item.category === selectedCategory)
      : data.newscards;

      return (
        <NewsContainer>
          {filteredNews.map((item, index) => {
            const formattedDate = new Date(item.date).toLocaleDateString('en-GB');
            const cardNumber = index + 1
            return (
              <NewsCard
                key={item.slug}
                title={item.header}
                content={item.content.substring(0, 100) + "..."}
                date={formattedDate}
                writer={item.writer}
                imageSRC={item.image[0]?.url}
                imageStyling='dontShow'
                number={cardNumber}
              >
                <Link to={`./singlenews/${item.slug}`}>Læs mere</Link>
              </NewsCard>
            );
          })}
        </NewsContainer>
      );
      
      
};
