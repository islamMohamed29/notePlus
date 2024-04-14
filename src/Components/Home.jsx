import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../redux/slices/notes-slice";
import Header from "./Header";
import Notes from "./Notes";
import Sidebar from "./Sidebar";
import { auth } from "../firebase";
import Alltodos from "./Alltodos";
import { useLocation } from "react-router-dom";

export default function Home() {
  const loadingQuickNote = useSelector((state) => state.notes.loadingQuickNote);
  const [value, setValue] = useState("");

  const [note, setNote] = useState({
    description: "",
  });
  let dispatch = useDispatch();
  const handleAddNote = (e) => {
    e.preventDefault();
    const htmlContent = document.querySelector(".ql-editor").innerHTML;
    const updatedNote = { ...note, description: htmlContent };
    dispatch(addNote(updatedNote));
    if (!loadingQuickNote) {
      setValue("");
    }
  };
  const location = useLocation();

  return (
    <>
      <div className="content-page">
        <div className="container-fluid">
          <Header />
          <div className="collapse write-note-collapse " id="collapseExample">
            <div className="card card-body">
              <ReactQuill theme="snow" value={value} onChange={setValue} />
              {!loadingQuickNote ? (
                ""
              ) : (
                <div className="over-lay">
                  <div class="spinner-border" role="status"></div>
                </div>
              )}
              <div className="buttons-collapse d-flex justify-content-end gap-2">
                <button
                  className="btn btn-dark"
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Close
                </button>
                <button
                  className={`btn btn-primary ${
                    value === "<p><br></p>" ? "disabled" : ""
                  }`}
                  onClick={(e) => handleAddNote(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          {location.pathname === "/notes" ? (
            <Notes></Notes>
          ) : location.pathname === "/" ? (
            <Notes></Notes>
          ) : location.pathname === "/todos" ? (
            <Alltodos />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
