import { useState } from "react";
import reactGA from "react-ga4";
import style from './CookieBanner.module.scss';

export const CookieBanner = () => {
  const [withAnalytics, setWithAnalytics] = useState(false);
  const [hasUserCookie, setHasUserCookie] = useState();

  if (withAnalytics === true) {
    reactGA.initialize("G-PVKD6SVNBQ");
  }

  function acceptGA() {
    setWithAnalytics(true);
    setHasUserCookie(true);
    localStorage.setItem("userAccept", true);
  }

  function denyGA() {
    setWithAnalytics(false);
    setHasUserCookie(true);
    localStorage.setItem("userAccept", false);
  }

  const hasUserAccepted = localStorage.getItem("userAccept");

  return (
    !hasUserCookie &&
    hasUserAccepted === null && (
      <div className={style.cookieStyling}>
        <p>Denne side bruger cookies</p>
        <button className={style.denyButton} onClick={denyGA}>DENY</button>
        <button className={style.acceptButton} onClick={acceptGA}>ACCEPT</button>
      </div>
    )
  );
};
