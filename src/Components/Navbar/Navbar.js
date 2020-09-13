import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";

import { actions } from "../../reducer";
import { Store } from "../../context";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Navbar.css";

export default function Navbar() {
  const [, dispatch] = Store();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: actions.SET_SEARCH,
      searchTerm: search,
    });
    history.push("/search");
  };
  return (
    <React.Fragment>
      <nav
        id="navbar"
        class="container-fluid d-flex flex-row  align-items-lg-center justify-content-between"
      >
        <Link path="/">
          <img
            onClick={(e) => history.push("/")}
            src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"
            alt=""
            className="logo"
            height="40px"
            width="200px"
          />
        </Link>
        <form
          action="/search"
          onSubmit={(e) => handleSubmit(e)}
          className="search__bar row d-none d-lg-flex   flex-row align-items-center justify-content-center"
        >
          <input
            className="col-11 "
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
          />
          <button className="col-1">
            <SearchIcon />
          </button>
        </form>

        <div className="nav__items d-flex flex-row  align-items-center justify-content-center ">
          <NavLink
            activeClassName="nav__item"
            to="/"
            className="nav__item text-left "
          >
            <p className="upper__nav__item">Hello , Sign in</p>
            <p className="lower__nav__item">Accounts and Lists</p>
          </NavLink>
          <NavLink
            activeClassName="nav__item"
            to="/"
            className="nav__item text-left d-lg-block d-none "
          >
            <p className="upper__nav__item">Returns</p>
            <p className="lower__nav__item">& Orders</p>
          </NavLink>
          <NavLink
            activeClassName="nav__item"
            to="/"
            className="nav__item d-lg-block text-left d-none "
          >
            <p className="upper__nav__item">
              <ShoppingCartIcon />
            </p>
            <p className="lower__nav__item">Cart</p>
          </NavLink>
        </div>
      </nav>
      <section className="sec__search">
        <form
          action="/search"
          className="search__bar mx-auto row d-lg-none d-flex   flex-row align-items-center justify-content-center"
        >
          <input className="col-9 " type="text" name="search" />
          <button className="col-1 text-center">
            <SearchIcon />
          </button>
        </form>
      </section>
    </React.Fragment>
  );
}
//#131921
