import {
  deleteAllTodos,
  deleteCompletedTodos,
} from "../redux/slices/todos-slice";
import Swal from "sweetalert2";
import { notifyError } from "./Notification";
export let loadingHelpers = false;
export const handleDeleteTodos = async (allTodos, dispatch) => {
  if (allTodos.length === 0) {
    return notifyError("There are no todos");
  }
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
    try {
      await dispatch(deleteAllTodos());
      Swal.fire({
        title: "Deleted!",
        text: "You have deleted all todos.",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const handleDeleteCompleted = async (allTodos, dispatch) => {
  let haveCompleted = allTodos.filter((todo) => todo.status === "completed");
  if (haveCompleted.length === 0) {
    return notifyError("There are no completed todos");
  }
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
    try {
      await dispatch(deleteCompletedTodos());
      Swal.fire({
        title: "Deleted!",
        text: "You have deleted all completed todos.",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  }
};
