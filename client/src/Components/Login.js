import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import authContext from "../Context/Auth/authContext";

export const Login = () => {
  const { user, setUser } = useContext(authContext);

  const [formData, setformData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("ATTEMPTING TO LOGIN USER");
    const res = await axios.post("/auth/login", { userData: formData });

    console.log("LOGIN RESPONSE : ", res);

    setUser(res.data.user);
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
          <h2>Login</h2>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              onChange={(e) => handleChange(e)}
              name="email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              onChange={(e) => handleChange(e)}
              name="password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button className="btn btn-danger" style={{ width: "200px" }}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};
