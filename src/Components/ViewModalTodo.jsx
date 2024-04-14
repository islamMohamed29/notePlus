import React, { useEffect } from "react";

import { useSelector } from "react-redux";

export default function ViewModalTodo() {
  const selectedTodo = useSelector((state) => state.todos.selectedTodo);
  useEffect(() => {
    console.log("hi am todo selected");
  }, []);

  return (
    <div
      className="modal fade"
      id="viewModalTodo"
      tabindex="-1"
      aria-labelledby="exampleViewModalTodo"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleViewModalTodo">
              View Todo
            </h1>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>{selectedTodo.content}</p>
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
