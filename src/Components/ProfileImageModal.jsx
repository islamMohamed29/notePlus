import React from "react";

export default function ProfileImageModal({ handleClick, setAvatar }) {
  return (
    <div
      className="modal fade"
      id="profileModal"
      tabindex="-1"
      aria-labelledby="exampleProfileModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleProfileModal">
              Edit Profilcce Image
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form onSubmit={(e) => handleClick(e)}>
              <input
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
