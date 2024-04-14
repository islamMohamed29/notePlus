import React from "react";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/user-slice";
import { clearNotes } from "../redux/slices/notes-slice";
import { clearTodos } from "../redux/slices/todos-slice";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

export default function MobileNavbar() {
  const currentUser = useSelector((state) => state.user.user);
  let { photoURL, displayName } = currentUser;
  let dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();
  const handleSignOut = () => {
    auth.signOut();

    navigate("/signin");
    dispatch(clearUser());
    dispatch(clearNotes([]));
    dispatch(clearTodos([]));
  };
  return (
    <>
      <div className="mobile-navbar">
        <nav class="navbar py-3 navbar-expand-xl">
          <div class="container-fluid flex-row-reverse">
            <div className="dropdown ">
              <div
                data-bs-toggle="modal"
                data-bs-target="#avatarChangeModal"
                className="icon-change-avatar"
              >
                <i class="fa-solid fa-camera"></i>
              </div>
              <a
                href="#"
                className="user-info  d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="avatar">
                  {photoURL ? (
                    <img
                      src={photoURL}
                      alt=""
                      width="50"
                      height="50"
                      className="rounded me-2"
                    />
                  ) : (
                    <img
                      src="assets/avatar-1.jpg"
                      alt=""
                      width="50"
                      height="50"
                      className="rounded me-2"
                    />
                  )}
                </div>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end text-small shadow"
                aria-labelledby="dropdownUser2"
              >
                <li>
                  <Link className="dropdown-item" href="#">
                    My Profile
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Edit Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Account Setting
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    onClick={() => handleSignOut()}
                    className="dropdown-item"
                    href="#"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            <button
              class="navbar-toggler "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse side-bar-mobile"
              id="navbarNav"
            >
              <ul class="navbar-nav">
                <a
                  href="/"
                  className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
                >
                  <img style={{ width: "50px" }} src="assets/logo.png" alt="" />
                  <span className="ms-2 fs-4">NotePlus</span>
                </a>
                <hr />
                <li className="nav-item mb-2">
                  <a
                    class="w-100 btn btn-dark dropdown-toggle "
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Add New
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <Link
                        to={"/addNote"}
                        className={
                          location.pathname === "/addNote"
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        href="#"
                      >
                        Blank Notes
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/addTodo"}
                        className={
                          location.pathname === "/addTodo"
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        href="#"
                      >
                        To-do
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item ">
                  <NavLink
                    to={"/notes"}
                    href="#"
                    className={
                      "nav-link actions" +
                      (location.pathname === "/" ? " active" : "")
                    }
                    aria-current="page"
                  >
                    <i class="fa-regular fa-note-sticky me-2"></i>
                    Your Notes
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/todos"} href="#" className="nav-link actions">
                    <i class="fa-regular fa-square-check me-2"></i>
                    Your Todos
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
