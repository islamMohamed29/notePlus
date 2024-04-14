import React from "react";

import { useSelector } from "react-redux";

export default function ViewModalNote() {
  const selectedNote = useSelector((state) => state.notes.selectedNote);

  return (
    <div
      className="modal fade"
      id="viewModal"
      tabindex="-1"
      aria-labelledby="exampleViewModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleViewModal">
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
            <div
              dangerouslySetInnerHTML={{ __html: selectedNote.description }}
            ></div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
