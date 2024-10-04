import { allCategories } from "../../queries/allCategories";
import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "react-router-dom";
import style from "./NavBar.module.scss";

export const NavBar = ({ setSelectedCategory, isNavShown }) => {
  //Sidens current url
  const location = useLocation();

  // Tjekker om siden ikke er homepage
  const isNotHomePage = location.pathname !== "/";

  // Fetcher fra allCategories query
  const { data, isLoading, error } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () =>
      request(import.meta.env.VITE_PUBLIC_ENDPOINT, allCategories),
  });

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error loading categories: {error.message}</p>;
  }

  return (
    <nav
      className={`${style.navStyling} ${
        isNavShown ? style.showNav : style.hideNav
      }`}
    >
      <ul>
        {/* setter selectedCategory til at være alle når man trykker på det */}
        <li onClick={() => setSelectedCategory("alle")}>
          {/* Hvis det ikke er en homepage er contentet i li'en et Link som navigerer til homepage */}
          <span> {isNotHomePage ? <Link to="/">Alle</Link> : "Alle"}</span>
        </li>

        {/* mapper alle categorierne ud som Li'ere */}
        {data.categories.map((item) => (
          <li
            key={item.category}
            // Setter selectedCategory som værende itemets category
            onClick={() => setSelectedCategory(item.category)}
          >
            {isNotHomePage ? (
              <Link to="/">{item.category}</Link>
            ) : (
              item.category
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
