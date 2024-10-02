import style from './NewsCard.module.scss'


export const NewsCard = ({ title, content, date, writer, imageSRC, children }) => {
  return (
    <div className={style.cardStyling}>
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
        <p className={style.redText}>
          D. {date} - af {writer}
        </p>
        {children}
      </div>
      <div>
        <img src={imageSRC} alt="" />
      </div>
    </div>
  );
};
