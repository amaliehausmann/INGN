import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { allNews } from "../queries/allNews";
import { NewsCard } from "../components/NewsCard/NewsCard";
import { Link, useOutletContext } from "react-router-dom";
import { NewsContainer } from "../components/NewsContainer/NewsContainer";

export const Home = () => {
  const { selectedCategory } = useOutletContext();

  //   Fetch af alle nyheder
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

  //   Filtrere det array der kommer fra api'et ved at trække alt ud hvor item.category er lig selected category
  const filteredNews =
    selectedCategory && selectedCategory !== "alle"
      ? data.newscards.filter((item) => item.category === selectedCategory)
      : data.newscards;

  // Function der resizer et array så der kun er x antal items pr. array. Tager  i mod et array og et antal items det skal splittes op i
  function resizeArray(array, size) {
    //Laver et nyt tomt array
    const newArray = [];

    //For loop hvor index starter på 0, loopet bliver ved med at køre så længe at index er mindre end array længden, efter hver omgang i loopet bliver start punktet i arrayet flyttet baseret på size
    for (let index = 0; index < array.length; index += size) {
      // //Det nye array newArray tilføjer så det oprindelige array i en forkortet version som går fra index tallet til index tallet + size
      newArray.push(array.slice(index, index + size));
    }

    // Returnerer det nye array
    return newArray;
  }

  return (
    <>
      {/* Mapper vores nye resized arrays udfra filteredNews og 9 som er den mængde items der skal være i hver container */}
      {resizeArray(filteredNews, 9).map((newsArray, mapKey) => (
        <NewsContainer key={mapKey}>

          {/* mapper newsArrayet */}
          {newsArray.map((item, index) => {
            
            // Formatterer datoen til engelsk dato i stedet for amerikansk
            const formattedDate = new Date(item.date).toLocaleDateString(
              "en-GB"
            );

            // Giver numre fra 1-9 ved at tage det overskydende af index divideret med 9 og plusse 1
            const cardNumber = (index % 9) + 1;
            return (
              <NewsCard
                key={item.slug}
                title={item.header}
                content={item.content.substring(0, 100) + "..."}
                date={formattedDate}
                writer={item.writer}
                imageSRC={item.image[0]?.url}
                imageStyling="dontShow"
                number={cardNumber}
              >
                <Link to={`./singlenews/${item.slug}`}>Læs mere</Link>
              </NewsCard>
            );
          })}
        </NewsContainer>
      ))}
    </>
  );
};
