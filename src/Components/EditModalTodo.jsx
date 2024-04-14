import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../redux/slices/todos-slice";
import Swal from "sweetalert2";

export default function EditModalTodo({ todoContent, setTodoContent }) {
  const selectedTodo = useSelector((state) => state.todos.selectedTodo);
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const handleUpdateTodo = async () => {
    if (selectedTodo && selectedTodo.id) {
      const result = await await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      });
      if (result.isConfirmed) {
        setLoading(true);
        if (selectedTodo.content === todoContent) {
          setLoading(false);
          return Swal.fire("The data is identical", "", "info");
        }
        try {
          await dispatch(
            updateTodo({
              todoId: selectedTodo.id,
              updatedTodoData: { content: todoContent },
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

  const handleChange = (e) => {
    setTodoContent(e.target.value);
  };
  useEffect(() => {
    if (selectedTodo) {
      setTodoContent(selectedTodo.content || "");
    }
  }, [selectedTodo]);

  return (
    <div
      className="modal fade"
      id="editModalTodo"
      tabindex="-1"
      aria-labelledby="exampleEditModalTodo"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleEditModalTodo">
              Edit Todo
            </h1>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <textarea
              name="content"
              onChange={(e) => handleChange(e)}
              value={todoContent}
              className="w-100"
            ></textarea>
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
              onClick={() => handleUpdateTodo()}
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
