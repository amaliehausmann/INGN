import { allCategories } from "../../queries/allCategories";
import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "react-router-dom";
import style from "./NavBar.module.scss";

export const NavBar = ({ setSelectedCategory, isNavShown }) => {
  const location = useLocation();
  const isSingleNewsPage = location.pathname.includes("/singlenews/");

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
        <li onClick={() => setSelectedCategory("alle")}>
          <span> {isSingleNewsPage ? <Link to="/">Alle</Link> : "Alle"}</span>
        </li>
        {data.categories.map((item) => (
          <li
            key={item.category}
            onClick={() => setSelectedCategory(item.category)}
          >
            {isSingleNewsPage ? (
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
