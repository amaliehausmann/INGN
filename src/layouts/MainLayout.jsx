import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { useState } from "react";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <>
      <Header setSelectedCategory={setSelectedCategory}></Header>
      <main>
        <Outlet context={{ selectedCategory }}></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
};
