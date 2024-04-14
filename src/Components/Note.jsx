import { format } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, setSelectedNote } from "../redux/slices/notes-slice";
import EditModal from "./EditModalNote";
import ViewModal from "./ViewModalNote";
import Swal from "sweetalert2";
import LoadingScreenActions from "../utils/LoadingScreenActions";
export default function Note({ note }) {
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  const handleNoteClick = (selectedNote) => {
    dispatch(setSelectedNote(selectedNote));
  };
  const handleDeleteNote = async (selectedNote) => {
    if (selectedNote) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await dispatch(deleteNote(selectedNote.id));
          setLoading(false);
          Swal.fire({
            title: "Deleted!",
            text: "Your Note has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    }
  };
  // const language = franc(note.title);

  return (
    <>
      {loading && <LoadingScreenActions />}

      <div
        className={`box-note ${note.priority || ""}`}
        // style={{ direction: language === "arb" ? "rtl" : "ltr" }}
      >
        <div className="head-note">
          <div className="icon-type-box">
            <i className={`${note.icon || "fa-regular fa-calendar"}`}></i>
          </div>
          <div
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="setting dropstart"
          >
            <i className="fa-solid fa-ellipsis"></i>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#viewModal"
                  onClick={() => handleNoteClick(note)}
                >
                  View
                </a>
              </li>
              <li>
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  class="dropdown-item"
                  href="#"
                  onClick={() => handleNoteClick(note)}
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleDeleteNote(note)}
                  class="dropdown-item"
                  href="#"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="note-content">
          <div className="note-type">
            <h3>{note.title || "Quick Note"}</h3>
          </div>
          {
            <div
              dangerouslySetInnerHTML={{ __html: note.description }}
              className="content"
            ></div>
          }
        </div>
        <div className="footer-note">
          <div className="allowed-to">
            <i className="fa-regular fa-user"></i> Only me
          </div>
          <div className="date-note">
            <i className="fa-solid fa-calendar-days me-1"></i>
            {format(new Date(note.createdAt), "dd/MM/yyyy")}
          </div>
        </div>
      </div>
      <EditModal />
      <ViewModal />
    </>
  );
}
