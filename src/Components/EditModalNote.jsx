import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../redux/slices/notes-slice";
import Swal from "sweetalert2";

export default function EditModalNote() {
  const selectedNote = useSelector((state) => state.notes.selectedNote);
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  const [updatedNoteData, setUpdatedNoteData] = useState({
    description: "",
  });
  const handleUpadteNote = async () => {
    if (selectedNote && selectedNote.id) {
      const result = await await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      });
      if (result.isConfirmed) {
        setLoading(true);
        if (selectedNote.description === updatedNoteData.description) {
          setLoading(false);
          return Swal.fire("The data is identical", "", "info");
        }
        try {
          await dispatch(
            updateNote({
              noteId: selectedNote.id,
              updatedNoteData: updatedNoteData,
            })
          );

          Swal.fire("Saved!", "", "success");
        } catch (error) {
          setLoading(false);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    }
  };

  const handleQuillChange = (content) => {
    updatedNoteData.description = content;
  };
  return (
    <div
      className="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="exampleEditModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleEditModal">
              {selectedNote ? selectedNote.title || "Quick Note" : ""}
            </h1>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <ReactQuill
              onChange={handleQuillChange}
              theme="snow"
              value={selectedNote.description}
            />
            {/* {selectedNote.description || (
              <div
                dangerouslySetInnerHTML={{ __html: selectedNote.noteText }}
                class="content"
              ></div>
            )} */}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={() => handleUpadteNote()}
              type="button"
              class="btn btn-primary"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
