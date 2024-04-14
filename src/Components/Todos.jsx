import React, { useEffect, useState } from "react";
import { toggleTodoStatus } from "../redux/slices/todos-slice";
import { useDispatch } from "react-redux";
import {
  handleDeleteTodos,
  handleDeleteCompleted,
} from "../utils/todosHelpers";

import "react-datepicker/dist/react-datepicker.css";
import { useFilteredTodos } from "../utils/useFilteredTodos";

export default function Todos({ allTodos }) {
  let dispatch = useDispatch();
  const { filter, setFilter, filteredTodos } = useFilteredTodos(allTodos);
  const [todosToShow, setTodosToShow] = useState(10);

  useEffect(() => {
    setTodosToShow(10);
  }, [allTodos.length]);

  return (
    <>
      <div className="todos-parent">
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
          <div className="total">
            {allTodos
              ? `${
                  allTodos.filter((todo) => todo.status !== "completed").length
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
              className="clear"
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

        <div className="todos">
          {filter === "all" && filteredTodos.length == 0 ? (
            <>not have any todos</>
          ) : (
            ""
          )}
          {filter === "active" && filteredTodos.length == 0 ? (
            <>not have active todos</>
          ) : (
            ""
          )}
          {filter === "completed" && filteredTodos.length == 0 ? (
            <>not have completed todos</>
          ) : (
            ""
          )}

          {filteredTodos.slice(0, todosToShow).map((todo) => {
            return (
              <div
                onClick={() => dispatch(toggleTodoStatus(todo.id))}
                className={`todo ${
                  todo.status === "completed" ? "completed" : ""
                }`}
              >
                <span className="state">
                  {todo.status === "completed" ? (
                    <i class="fa-solid fa-check"></i>
                  ) : (
                    <i class="fa-solid fa-minus"></i>
                  )}
                </span>
                <div className="content">
                  <p>{todo.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
