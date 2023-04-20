import { Link } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */
export const Footer = () => {
  return (
    <div className="main-color">
      <footer
        className="container d-flex flex-wrap 
                justify-content-between align-items-center py-5 main-color"
      >
        <p className="col-md-4 mb-0 text-white">
          © Example Library App, INizar 2023
        </p>
        <ul className="nav navbar-dark col-md-4 justify-content-end">
          <li className="nav-item">
            <Link className="nav-link px-2 text-white" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-2 text-white" to="/search">
              Search Books
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};
