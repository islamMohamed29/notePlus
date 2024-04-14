import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../redux/slices/notes-slice";
import LoadingScreen from "../utils/LoadingScreen";

export default function Addnote() {
  let dispatch = useDispatch();
  const [activeIcon, setActiveIcon] = useState("fa-regular fa-calendar");
  const [priority, setPriority] = useState("very-low");
  const loading = useSelector((state) => state.notes.loading);
  const [isOpen, setIsOpen] = useState(true);
  const [note, setNote] = useState({
    title: "",
    description: "",
    icon: "fa-regular fa-calendar",
    priority: priority !== null && priority !== undefined ? priority : "low",
  });

  const handleClick = (iconName) => {
    setActiveIcon(iconName);
    note.icon = iconName;
  };
  const selectPriority = (e) => {
    setPriority(e.target.value);
  };
  const getNote = (e) => {
    let userNote = { ...note };
    userNote[e.target.name] = e.target.value;
    setNote(userNote);
  };

  const handleAddNote = (e) => {
    e.preventDefault();

    dispatch(addNote(note));
    document.getElementById("form-add").reset();
    setActiveIcon("fa-regular fa-calendar");
    setPriority("very-low");
    setNote({
      title: "",
      description: "",
    });
  };
  useEffect(() => {
    setNote((prevNote) => ({
      ...prevNote,
      priority: priority !== null ? priority : "low",
    }));
  }, [priority]);
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  }, []);

  return (
    <div>
      {isOpen && <LoadingScreen />}
      <Sidebar />
      <div className="content-page">
        <div className="container-fluid">
          <Header />
        </div>
        <div className="aria-new-note">
          <div className="row gy-4">
            <div className="col-md-8">
              <div className="box">
                <form id="form-add">
                  <div class="mb-3">
                    <label for="text" class="form-label">
                      Text
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="text"
                      name="title"
                      onChange={(e) => getNote(e)}
                      placeholder="Example Note"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="description" class="form-label">
                      Description
                    </label>
                    <textarea
                      class="form-control"
                      id="Description"
                      rows="3"
                      name="description"
                      onChange={(e) => getNote(e)}
                      placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, aliquam porro. Quibusdam provident sint animi neque dolor deleniti voluptates veritatis."
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="Icon" class="form-label">
                      Icons
                    </label>
                    <div className="icons">
                      <div
                        className={`icon ${
                          activeIcon === "fa-regular fa-calendar"
                            ? "active"
                            : ""
                        }`}
                        onClick={() => handleClick("fa-regular fa-calendar")}
                      >
                        <i className="fa-regular fa-calendar"></i>
                      </div>
                      <div
                        className={`icon ${
                          activeIcon === "fa-regular fa-note-sticky"
                            ? "active"
                            : ""
                        }`}
                        onClick={() => handleClick("fa-regular fa-note-sticky")}
                      >
                        <i className="fa-regular fa-note-sticky"></i>
                      </div>
                      <div
                        className={`icon ${
                          activeIcon === "fa-solid fa-camera" ? "active" : ""
                        }`}
                        onClick={() => handleClick("fa-solid fa-camera")}
                      >
                        <i className="fa-solid fa-camera"></i>
                      </div>
                      <div
                        className={`icon ${
                          activeIcon === "fa-regular fa-envelope"
                            ? "active"
                            : ""
                        }`}
                        onClick={() => handleClick("fa-regular fa-envelope")}
                      >
                        <i className="fa-regular fa-envelope"></i>
                      </div>
                      <div
                        className={`icon ${
                          activeIcon === "fa-solid fa-gear" ? "active" : ""
                        }`}
                        onClick={() => handleClick("fa-solid fa-gear")}
                      >
                        <i className="fa-solid fa-gear"></i>
                      </div>
                      <div
                        className={`icon ${
                          activeIcon === "fa-solid fa-sliders" ? "active" : ""
                        }`}
                        onClick={() => handleClick("fa-solid fa-sliders")}
                      >
                        <i className="fa-solid fa-sliders"></i>
                      </div>
                      <div
                        className={`icon ${
                          activeIcon === "fa-solid fa-cake-candles"
                            ? "active"
                            : ""
                        }`}
                        onClick={() => handleClick("fa-solid fa-cake-candles")}
                      >
                        <i className="fa-solid fa-cake-candles"></i>
                      </div>
                      <div
                        className={`icon ${
                          activeIcon === "fa-solid fa-house" ? "active" : ""
                        }`}
                        onClick={() => handleClick("fa-solid fa-house")}
                      >
                        <i className="fa-solid fa-house"></i>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 select-div">
                    <label for="select" class="form-label">
                      Priority
                    </label>
                    <select
                      onChange={(e) => selectPriority(e)}
                      class="form-select"
                      id="select"
                      aria-label="Default select example"
                    >
                      <option value="very-low">Very Low</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="very-high">Very High</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-outline-dark me-2">
                    <i class="fa-solid fa-angles-left"></i> Reset
                  </button>
                  <button
                    type="submit"
                    class="btn btn-dark"
                    onClick={(e) => handleAddNote(e)}
                  >
                    {loading ? (
                      "loading...."
                    ) : (
                      <>
                        <i class="fa-regular fa-share-from-square"></i> Save
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box">
                <div className={`box-note ${priority}`}>
                  <div className="head-note">
                    <div className="icon-type-box">
                      <i className={`${activeIcon}`}></i>{" "}
                    </div>
                    <div className="setting ">
                      <i className="fa-solid fa-ellipsis"></i>
                    </div>
                  </div>
                  <div className="note-content">
                    <div className="note-type">
                      <h3>{note.title || `Example Note`}</h3>
                    </div>
                    <div className="content">
                      <p>
                        {note.description ||
                          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, aliquam porro. Quibusdam provident sint animi neque dolor deleniti voluptates veritatis."}
                      </p>
                    </div>
                  </div>
                  <div className="footer-note">
                    <div className="allowed-to">
                      <i className="fa-regular fa-user"></i> Only me
                    </div>
                    <div className="date-note">
                      <i className="fa-solid fa-calendar-days me-1"></i>
                      {format(new Date(), "dd/MM/yyyy")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
