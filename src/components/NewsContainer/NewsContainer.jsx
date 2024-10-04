import style from "./NewsContainer.module.scss";

export const NewsContainer = ({ children }) => {
  return <section className={style.containerStyling}>{children}</section>;
};
