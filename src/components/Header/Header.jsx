import { IoPersonSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { NavBar } from "../NavBar/NavBar";
import style from './Header.module.scss';
import { useState } from "react";

export const Header = ({setSelectedCategory}) => {

    const [isNavShown, setIsNavShown] = useState(false);

    function toggleNavBar(){
      setIsNavShown(!isNavShown);
    }

  return (
    <header className={style.headerStyling}>
        <h1>INGN</h1>
        <NavBar setSelectedCategory={setSelectedCategory} isNavShown={isNavShown} ></NavBar>
        <div>
        <IoPersonSharp />
        <IoMdMenu onClick={toggleNavBar}/>
        </div>
    </header>
  )
}