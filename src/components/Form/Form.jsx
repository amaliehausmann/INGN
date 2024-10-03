import style from "./Form.module.scss";

export const Form = ({ setUser, user }) => {
  function submitForm(event) {
    event.preventDefault();

    console.log("Din value er:", event.target.email.value);
    let email = event.target.email.value;
    let password = event.target.password.value;

    let body = JSON.stringify({ email: email, password: password });

    if (email && password) {
      fetch("http://localhost:3000/signin", {
        method: "POST",
        body: body,
        headers: { "Content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.token) {
            setUser({ token: data.token });
            localStorage.setItem("authToken", data.token);
          } else {
            console.log("Invalid email or password");
          }
        });
    }
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("authToken");
  }

  return !user ? (
    <div className={style.formStyling}>
      <h1>Log ind</h1>
      <form onSubmit={(event) => submitForm(event)}>
        <label>Brugernavn:</label>
        <input type="email" name="email" />

        <label>Password:</label>
        <input type="password" name="password" />

        <input className={style.submitBtn} type="submit" value="Log ind" />
      </form>
    </div>
  ) : (
    <button className={style.signoutBtn} onClick={() => signOut()}>
      Log ud
    </button>
  );
};
