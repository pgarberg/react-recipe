import React, { useContext } from "react";
import { ProfileIcon } from "../Icons/ProfileIcon";
import authContext from "../Context/Auth/authContext";
import { Redirect } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";

export const Profile = () => {
  const Container = styled.div`
    padding: 3rem 5rem;
    border: 2px solid grey;
    border-radius: 8px;
    min-height: 70vh;
    margin: 0 5rem;

    .underline-thick {
      width: 20rem;
      border-bottom: 3px solid grey;
      margin: 1rem 0;
    }
    .underline-thin {
      width: 15rem;
      border-bottom: 1px solid grey;
      margin: 1rem 0;
    }

    @media screen and (max-width: 650px) {
      h3 {
        color: blue;
      }
      margin: 0 2rem;
      padding: 3rem;
    }
    @media screen and (max-width: 650px) {
      h3 {
        color: blue;
      }
      margin: 0 1rem;
      padding: 2rem;
    }
  `;

  const ManagePayment = styled.div`
    display: "flex";
    justify-content: "space-between";
    align-items: "center";
    width: "25%";
    margin: "0";
  `;

  const { user } = useContext(authContext);
  if (user === null) {
    return <Redirect to="/login" />;
  }

  const { email, _id } = user;

  const onToken = (token) => {
    alert("SUCCESS GOT TOKEN!");
  };
  return (
    <Container>
      {user === null && <Redirect to="/login" />}
      <h1>Welcome {email}!</h1>
      <div className="underline-thick" />
      <h3>ID: {_id}</h3>
      <div className="mt-5">
        <h4>Subscription: Active</h4>
        <div className="underline-thin" />
        <ManagePayment>
          <StripeCheckout
            token={onToken}
            stripeKey="pk_test_6sW8nOJdT1Arcl0LoiFUs2CY00nxRZBr1e"
          >
            <div className="btn btn-primary">Add To Subscription</div>
          </StripeCheckout>
        </ManagePayment>
      </div>
    </Container>
  );
};
