import { IoPersonSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { NavBar } from "../NavBar/NavBar";
import style from "./Header.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = ({ setSelectedCategory }) => {
  const [isNavShown, setIsNavShown] = useState(false);

  //   Function der toggler om navbaren er synlig
  function toggleNavBar() {
    setIsNavShown(!isNavShown);
  }

  return (
    <header className={style.headerStyling}>
      <Link to="/">
        <h1>INGN</h1>
      </Link>
      <NavBar
        setSelectedCategory={setSelectedCategory}
        isNavShown={isNavShown}
      ></NavBar>
      <div>
        <Link to="/signin">
          <IoPersonSharp />
        </Link>
        <IoMdMenu className={style.menuStyling} onClick={toggleNavBar} />
      </div>
    </header>
  );
};
