import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import MobileNavbar from "./MobileNavbar";

export default function LayOut() {
  const currentUser = useSelector((state) => state.user.user);
  console.log(currentUser);
  return (
    <>
      {currentUser && <Sidebar />}
      {currentUser && <MobileNavbar />}
      <Outlet />
      <ToastContainer />
    </>
  );
}
