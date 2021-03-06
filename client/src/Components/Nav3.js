import React, { useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "../Context/Auth/authContext";
import styled from "styled-components";
import Plus from "../Icons/Plus";
import { Hamburger } from "../Icons/Hamburger";

export const Nav3 = () => {
  const { user, removeUser } = useContext(authContext);

  const Nav = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100vw;
    padding: 0;
    right: 0;
    top: 10px;
    z-index: 30;
    left: 0;
    position: absolute;

    .logo {
      * {
        color: #5f00db !important;
        :link {
          text-decoration: none;
        }

        :visited {
          text-decoration: none;
        }

        :hover {
          text-decoration: none;
        }

        :active {
          text-decoration: none;
        }
      }

      font-size: 32px;
      font-weight: 600;
      margin-left: 50px;
    }

    .dropbox {
      display: none;
      width: 15%;
      cursor: pointer;
    }

    .links {
      min-width: 40%;
      justify-content: flex-end;
      align-items: center;

      ul {
        margin-right: 50px;
        padding: 0;
        display: flex;
        list-style: none;
      }
    }

    @media screen and (max-width: 1120px) {
      .links {
        min-width: 60%;
      }
    }
    @media screen and (max-width: 880px) {
      .links {
        min-width: 70%;
      }
      ul {
        margin-right: 20px;
        align-items: center;
      }
      .logo {
        margin-left: 20px;
        font-size: 28px;
      }
    }
    @media screen and (max-width: 865px) {
      .links {
        display: none;
      }
      .logo {
        margin-left: 50px;
        font-size: 32px;
      }
      .dropbox {
        display: block;
      }
    }
    .dropleft .dropdown-toggle::before {
      display: none;
    }
  `;

  const renderLinks = () => {
    if (user !== null) {
      return (
        <>
          <ul class="nav links">
            <li class="nav-item">
              <Link class="nav-link active" to="/">
                Recipes
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/collections">
                Collections
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/mealplanner">
                Meal Planner
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/savedmealplans">
                Saved Plans
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/grocery-list">
                grocery-list
              </Link>
            </li>

            <li class="nav-item" onClick={() => removeUser()}>
              <a class="nav-link" href="/api/logout">
                Logout
              </a>
            </li>
            {/* <li class="nav-item nav-link">Current User : {user && user._id}</li> */}
          </ul>

          <div className="dropbox">
            <div class="dropleft">
              <h2
                class="dropdown-toggle"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Hamburger fill={"black"} />
              </h2>

              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button class="dropdown-item" type="button">
                  <Link to="/">Recipes</Link>
                </button>
                <button class="dropdown-item" type="button">
                  <Link to="/collections">Collections</Link>
                </button>
                <button class="dropdown-item" type="button">
                  <Link to="/mealplanner">Meal Planner</Link>
                </button>

                <button class="dropdown-item" type="button">
                  <Link to="/unscrapeables">Saved Plans</Link>
                </button>
                <button class="dropdown-item" type="button">
                  <Link to="/profile">Profile</Link>
                </button>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <ul class="nav links">
            <li class="nav-item">
              <Link class="nav-link active" to="/login">
                Login
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/register">
                Register
              </Link>
            </li>
          </ul>
          <div className="dropbox">
            <div class="dropleft">
              <h2
                class="dropdown-toggle"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Hamburger fill={"black"} />
              </h2>

              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button class="dropdown-item" type="button">
                  <Link to="/login">Login</Link>
                </button>
                <button class="dropdown-item" type="button">
                  <Link to="/register">Register</Link>
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <Nav>
      <div className="logo">
        <Link to="/">
          <h3>ReactiveRecipes</h3>
        </Link>
      </div>

      {renderLinks()}
    </Nav>
  );
};
