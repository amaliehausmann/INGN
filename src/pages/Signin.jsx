export const Signin = ({setUser, user}) => {
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
              localStorage.setItem('authToken', data.token);
          } else {
              console.log('Invalid email or password');
          }
      });
      
    }
  }

  function signOut(){
    setUser(null);
    localStorage.removeItem('authToken')
  }

  return (
    !user ? <div>
      <h1>Sign In</h1>
      <form onSubmit={(event) => submitForm(event)}>
        <label >Email</label>
        <input type="email" name="email" />

        <label >Password</label>
        <input type="password" name="password" />

        <input type="submit" value="Submit" />
      </form>
    </div> : <button onClick={()=> signOut()}>Sign Out</button>
  );
};
