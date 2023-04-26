import {NavLink, Link} from "react-router-dom";
import {useOktaAuth} from "@okta/okta-react";
import {SpinnerLoading} from "../utils/SpinnerLoading";

/* eslint-disable jsx-a11y/anchor-is-valid */
export const Navbar = () => {
    const {oktaAuth, authState} = useOktaAuth();
    if (!authState) {
        return <SpinnerLoading/>;
    }
    const handleLogout = async () => oktaAuth.signOut();


    return (
        <div className="navbar navbar-expand-lg navbar-dark main-color py-3">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/home">NizaRead</NavLink>
                <button
                    type="button"
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropDown"
                    aria-controls="navbarNavDropDown"
                    aria-expanded="false"
                    aria-label="Toggle Navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropDown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/search">
                                Search Books
                            </NavLink>
                        </li>
                        {  authState.isAuthenticated &&
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/shelf">
                                    Shelf
                                </NavLink>
                            </li>
                        }
                        {  authState.isAuthenticated && authState.accessToken?.claims.userType === 'admin' &&
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin">
                                    Admin
                                </NavLink>
                            </li>
                        }
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {
                            !authState.isAuthenticated ?
                                <li className="nav-item m-1">
                                    <Link type="button" className="btn btn-outline-light" to="/login"> Sign In</Link>
                                </li> :
                                <li>
                                  <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};
