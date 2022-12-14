import React from "react";
import { Link } from "react-router-dom";


const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          KİTAPLIĞIM
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="homeNavbar nav-link active"
                aria-current="page"
                to="/"
              >
                Kitaplar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="homeNavbar2 nav-link active "
                aria-current="page"
                to="/categories"
              >
                Kategoriler
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Sitede Ara"
              aria-label="Search"
            />
            <button
              className="btn btn-primary color-black btn-outline-success"
              type="submit"
            >
              Arama
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
