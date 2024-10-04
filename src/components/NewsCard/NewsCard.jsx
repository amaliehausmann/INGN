import style from "./NewsCard.module.scss";

export const NewsCard = ({
  title,
  content,
  date,
  writer,
  imageSRC,
  children,
  imageStyling,
  number,
}) => {
  return (
    <div
      className={`${style.cardStyling} ${style[imageStyling]} ${
        style[`news-${number}`]
      }`}
    >
      <div>
        <img src={imageSRC} alt="" />
        <h1>{title}</h1>
        <p className={style.redText}>
          D. {date} - af {writer}
        </p>
        <p className={style.contentStyling}>{content}</p>
        {children}
      </div>
      <div
        className={style.imageContainer}
        style={{ backgroundImage: `url(${imageSRC})` }}
      ></div>
    </div>
  );
};
