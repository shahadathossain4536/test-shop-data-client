import React from "react";
import auth from "../../firebase.init";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user, loading, error] = useAuthState(auth);
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";
  if (user) {
    const url = `http://localhost:5000/login`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: user?.email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("accessToken", data.token);
        navigate(from, { replace: true });
      });
  }
  return (
    <div>
      <button onClick={() => signInWithGoogle()} className="btn btn-warning">
        Google SignIn
      </button>
    </div>
  );
};

export default SignIn;
