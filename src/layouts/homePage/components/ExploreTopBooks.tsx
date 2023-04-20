import { Link } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */
export const ExploreTopBooks = () => {
  return (
    <div className="header bg-dark p-5 mb-4">
      <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
        <div>
          <h1 className="display-5 fw-bold">Find your next adventure</h1>
          <p className="col-md-8 fs-4">Where would you like to ge next?</p>
          <Link
            type="button"
            className="btn btn-lg main-color text-white"
            to="/search"
          >
            Explore top books
          </Link>
        </div>
      </div>
    </div>
  );
};
