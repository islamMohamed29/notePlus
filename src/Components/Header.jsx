import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <>
      <div className="header">
        {location.pathname === "/addNote" ? (
          <div className="write-note d-flex align-items-center justify-content-between text-dark  ">
            <h5 className="m-0">New Note</h5>
            <Link to={"/"} className="back-newnote btn btn-dark">
              Back
            </Link>
          </div>
        ) : location.pathname === "/notes" || location.pathname === "/" ? (
          <div className="write-note">
            <a
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <i className="fa-solid fa-pencil me-1"></i> Write Your Quick Note
            </a>
          </div>
        ) : location.pathname === "/todos" ? (
          <div className="write-todo d-flex align-items-center justify-content-between text-dark  ">
            <Link to={"/addTodo"} className="add-new m-0">
              Add New
            </Link>
            <Link to={"/"} className="back-yourtodos btn btn-dark">
              Back
            </Link>
          </div>
        ) : (
          ""
        )}

        <div className="top-buttons">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-regular fa-envelope"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-regular fa-bell"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
