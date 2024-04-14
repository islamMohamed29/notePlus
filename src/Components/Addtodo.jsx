import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Todos from "./Todos";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, getTodos } from "../redux/slices/todos-slice";
import LoadingScreen from "../utils/LoadingScreen";

export default function Addtodo() {
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState({
    content: "",
    status: "active",
  });
  const getTodoData = (e) => {
    let myTodo = { ...todo };
    myTodo[e.target.name] = e.target.value;
    setTodo(myTodo);
    console.log(todo);
  };
  function handleAddTodo(e) {
    e.preventDefault();
    if (!todo.content) return;
    dispatch(addTodo(todo));
    document.getElementById("add-todo").reset();
    setTodo({
      content: "",
      status: "active",
    });
  }
  const allTodos = useSelector((state) => state.todos.todos);
  useEffect(() => {
    dispatch(getTodos())
      .then(() => setLoading(false))
      .catch((error) => console.error("Error loading todos: ", error));
  }, [dispatch]);

  return (
    <div>
      {loading && <LoadingScreen />}
      <Sidebar />
      <div className="add-todo">
        <div className="head">
          <div className="content">
            <div className="head-title mb-3">New Todo</div>
            <form id="add-todo" onSubmit={handleAddTodo}>
              <div className="form-group">
                <input
                  placeholder="Start typing..."
                  type="text"
                  className="form-control"
                  name="content"
                  onChange={(e) => getTodoData(e)}
                />
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Todos allTodos={allTodos} />
    </div>
  );
}
