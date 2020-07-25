import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import authContext from "../Context/Auth/authContext";

export const Login = () => {
  const { user, setUser } = useContext(authContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("ATTEMPTING TO LOGIN USER");
    const res = await axios.post("/auth/login", {});

    console.log("LOGIN RESPONSE : ", res);
    setUser(res.data);
  };
  return (
    <div>
      {user !== null && <Redirect to="/" />}
      <div
        style={{
          height: "80vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <button className="btn btn-danger" style={{ width: "200px" }}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};
