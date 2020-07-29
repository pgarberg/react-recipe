import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import authContext from "../Context/Auth/authContext";

import { withAlert } from "react-alert";

const Login = ({ alert }) => {
  const { user, setUser } = useContext(authContext);

  const [formData, setformData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("ATTEMPTING TO LOGIN USER");
    const res = await axios.post("/auth/local", formData);

    console.log("LOGIN RESPONSE : ", res);

    if (res.data.status !== 200) {
      return alert.error(res.data.error);
    }
    setUser(res.data.user);
  };
  return (
    <div>
      {user !== null && <Redirect to="/" />}
      <div
        style={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{ marginBottom: "10px" }}
        >
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
          <button className="btn btn-danger" style={{ width: "100%" }}>
            LOGIN
          </button>
        </form>

        <a href="/auth/google">
          <button
            className="btn btn-danger"
            style={{ padding: ".375rem 2.155rem" }}
          >
            LOGIN WITH GOOGLE
          </button>
        </a>
      </div>
    </div>
  );
};

export default withAlert()(Login);
