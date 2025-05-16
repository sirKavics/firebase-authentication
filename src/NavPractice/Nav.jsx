import React from "react";
import "./Nav.css";
import { auth } from "../firebase/init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function Nav() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [loginLoading, setLoginLoading] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setUser(user);
    });
  }, []);

  function register() {
    createUserWithEmailAndPassword(auth, "falf@gmail.com", "falf123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    setLoginLoading(true);
    signInWithEmailAndPassword(auth, "falf@gmail.com", "falf123")
      .then(({ user }) => {
        console.log(user);
        setTimeout(() => {
            setUser(user);
            setLoginLoading(false)
        }, 500)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function logout() {
    signOut(auth);
    setUser(null);
  }

  return (
    <div className="practice__nav">
      {loading || loginLoading ? (
        <>
          <div className="skeleton skeleton__register"></div>
          <div className="skeleton skeleton__login"></div>
        </>
      ) : !user ? (
        <>
          <button className="nav__buttons nav__register" onClick={register}>
            Register
          </button>
          <button className="nav__buttons nav__login" onClick={login}>
            Login
          </button>
        </>
      ) : (
        <>
          <button className="nav__buttons nav__logout" onClick={logout}>
            {user?.email?.[0]?.toUpperCase()}
          </button>
        </>
      )}
    </div>
  );
}

export default Nav;
