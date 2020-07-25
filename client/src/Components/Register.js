import React from "react";
import axios from "axios";

export const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ATTEMPTING TO REGISTER USER");

    const res = await axios.post("/auth/register", {});

    console.log("REGISTER RESPONSE : ", res);
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
      <form onSubmit={(e) => handleSubmit(e)}>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "200px" }}
        >
          REGISTER
        </button>
      </form>
    </div>
  );
};
