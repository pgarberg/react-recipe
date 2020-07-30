import React, { useContext, useState } from "react";
import axios from "axios";
import authContext from "../Context/Auth/authContext";
import { Redirect } from "react-router-dom";

import { withAlert } from "react-alert";

const Register = ({ alert }) => {
  //TEST
  const [formData, setformData] = useState({ username: "", password: "" });

  const { user, setUser } = useContext(authContext);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ATTEMPTING TO REGISTER USER");

    const res = await axios.post("/auth/register", { userData: formData });

    console.log("REGISTER RESPONSE : ", res);

    if (res.data.status !== 200) {
      return alert.error(res.data.error);
    }

    setUser(res.data.user);
  };
  return (
    <div
      style={{
        height: "80vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user !== null && <Redirect to="/" />}
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Register</h2>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            name="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            name="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword2">Confirm Password</label>
          <input
            name="passwordConfirm"
            type="password"
            class="form-control"
            id="exampleInputPassword2"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default withAlert()(Register);
