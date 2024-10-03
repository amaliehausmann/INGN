import style from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={style.footerStyling}>
      <section>
        <p className={style.fontStyling}>Adresse:</p>
        <p className={style.adressStyling}>Intet nyt - Godt nyt ApS</p>
        <p>Tulipanvej 232</p>
        <p>7320</p>
        <p>Valby Øster</p>
      </section>
      <section>
        <p className={style.fontStyling}>Links</p>
        <p>vikanweb.dk</p>
        <p>overpådenandenside.dk</p>
        <p>retsinformation.dk</p>
        <p>nogetmednews.dk</p>
      </section>
      <section>
        <p className={style.fontStyling}>Politik</p>
        <p>Privatlivspolitik</p>
        <p>Cookiepolitik</p>
        <p>Købsinformation</p>
        <p>Delingspolitik</p>
      </section>
      <section>
        <p className={style.fontStyling}>Kontakt</p>
        <p>ingn@nyhed.dk</p>
        <p>telefon: 23232323</p>
        <p>fax: 123123-333</p>
      </section>
    </footer>
  );
};
