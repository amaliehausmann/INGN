import { useState } from "react";
import reactGA from "react-ga4";

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
      <div>
        <p>Denne side bruger cookies</p>
        <button onClick={denyGA}>DENY</button>
        <button onClick={acceptGA}>ACCEPT</button>
      </div>
    )
  );
};
