import React from "react";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";

export default function ChangeAvatarModal({
  avatar,
  onDrop,
  handleChangeAvatar,
}) {
  const dropzoneStyles = {
    border: "2px dashed #0087F7",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  };
  const currentUser = useSelector((state) => state.user.user);

  const { photoURL } = currentUser;

  return (
    <div
      className="modal-changeAvatar modal fade"
      id="avatarChangeModal"
      tabindex="-1"
      aria-labelledby="exampleAvatarModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Upload Your Photo</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div className="box-avatar">
              {
                <Dropzone onDrop={onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section className="drag-here">
                      <div {...getRootProps()} style={dropzoneStyles}>
                        <input {...getInputProps()} />
                        <p>
                          (إختيارى) <br /> قم بسحب الصورة هنا او إنقر لاختيارها
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              }

              {avatar && (
                <div className="isAvatar">
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="Avatar"
                    className="avatar"
                  />
                </div>
              )}
            </div>
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
              onClick={() => handleChangeAvatar()}
              type="button"
              data-bs-dismiss="modal"
              class="btn btn-primary"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
