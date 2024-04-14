import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  getTodos,
  setSelectedTodo,
  toggleTodoStatus,
} from "../redux/slices/todos-slice";
import { useFilteredTodos } from "../utils/useFilteredTodos";
import { useTodoToShow } from "../utils/useTodoToShow";
import Swal from "sweetalert2";
import LoadingScreenActions from "../utils/LoadingScreenActions";
import ViewModalTodo from "./ViewModalTodo";
import LoadingScreen from "../utils/LoadingScreen";
import EditModalTodo from "./EditModalTodo";
import {
  handleDeleteCompleted,
  handleDeleteTodos,
} from "../utils/todosHelpers";

export default function Alltodos() {
  const allTodos = useSelector((state) => state.todos.todos);
  const { filter, setFilter, filteredTodos, setFilteredTodos } =
    useFilteredTodos(allTodos);
  const { todosToShow, setTodosToShow } = useTodoToShow(allTodos);
  const [loading, setLoading] = useState(false);
  const selectedTodo = useSelector((state) => state.todos.selectedTodo);
  const [todoContent, setTodoContent] = useState(selectedTodo?.content || "");
  const loadinGetTodos = useSelector((state) => state.todos.loadingGetTodos);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleTodoClick = (selectedTodo) => {
    setTodoContent(selectedTodo.content);
    dispatch(setSelectedTodo(selectedTodo));
  };
  const handleDeleteTodo = async (todo) => {
    if (todo) {
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
          await dispatch(deleteTodo(todo.id));
          setLoading(false);
          Swal.fire({
            title: "Deleted!",
            text: "Your Todo has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    }
  };

  const handleFilterChange = (event) => {
    setFilteredTodos(
      allTodos.filter((todo) => todo.content.includes(event.target.value))
    );
  };

  return (
    <>
      {loading && <LoadingScreenActions />}
      {loadinGetTodos && <LoadingScreen />}
      <div className="content-page">
        <div className="container-fluid">
          <Header />
          <div className="all-todos">
            <div className="header-todo-section ">
              <h2>Your Todos</h2>
            </div>
            <div className="controller">
              <select
                value={todosToShow}
                onChange={(e) => setTodosToShow(Number(e.target.value))}
              >
                <option value={allTodos.length}>All</option>
                <option value={100}>100</option>
                <option value={50}>50</option>
                <option value={30}>30</option>
                <option selected value={10}>
                  10
                </option>
              </select>
              <div className="form-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search by content"
                  onChange={handleFilterChange}
                />
              </div>
              <div className="total">
                {allTodos
                  ? `${
                      allTodos.filter((todo) => todo.status !== "completed")
                        .length
                    } items left`
                  : "Not Have Items"}
              </div>
              <div className="status">
                <button
                  onClick={() => setFilter("all")}
                  className={filter === "all" ? "active" : ""}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={filter === "active" ? "active" : ""}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={filter === "completed" ? "active" : ""}
                >
                  Completed
                </button>
              </div>
              <div className="buttons d-flex">
                <div
                  onClick={() => handleDeleteTodos(allTodos, dispatch)}
                  className="clear me-1"
                >
                  Clear All
                </div>
                <div
                  onClick={() => handleDeleteCompleted(allTodos, dispatch)}
                  className="clear"
                >
                  Clear Completed
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Content</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTodos.slice(0, todosToShow).map((todo, index) => {
                    return (
                      <tr
                        className={`todo ${
                          todo.status === "completed" ? "completed" : ""
                        }`}
                      >
                        <td scope="row">{index + 1}</td>
                        <td
                          class="content-cell"
                          onClick={() => dispatch(toggleTodoStatus(todo.id))}
                          scope="row"
                        >
                          {todo.content}
                        </td>
                        <td class="actions-cell">
                          <div class="d-flex">
                            <button
                              type="button"
                              className="btn btn-danger me-2"
                              onClick={() => handleDeleteTodo(todo)}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#viewModalTodo"
                              onClick={() => handleTodoClick(todo)}
                            >
                              View
                            </button>
                            <button
                              type="button"
                              className="btn btn-success me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#editModalTodo"
                              onClick={() => handleTodoClick(todo)}
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Content</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTodos.slice(0, todosToShow).map((todo, index) => {
                  return (
                    <tr
                      className={`todo ${
                        todo.status === "completed" ? "completed" : ""
                      }`}
                    >
                      <th scope="row">{index + 1}</th>
                      <th
                        onClick={() => dispatch(toggleTodoStatus(todo.id))}
                        className="content"
                        scope="row"
                      >
                        <p>{todo.content}</p>
                      </th>
                      <th>
                        <button
                          type="button"
                          className="btn btn-secondary me-1"
                          data-bs-toggle="modal"
                          data-bs-target="#editModalTodo"
                          onClick={() => handleTodoClick(todo)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-success me-1"
                          data-bs-toggle="modal"
                          data-bs-target="#viewModalTodo"
                          onClick={() => handleTodoClick(todo)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDeleteTodo(todo)}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
      <ViewModalTodo />
      <EditModalTodo
        setTodoContent={setTodoContent}
        todoContent={todoContent}
      />
    </>
  );
}
