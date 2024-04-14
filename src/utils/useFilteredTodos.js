import { useEffect, useState } from "react";

export const useFilteredTodos = (allTodos) => {
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState(allTodos);

  useEffect(() => {
    if (filter === "all") {
      setFilteredTodos(allTodos);
    } else if (filter === "active") {
      setFilteredTodos(allTodos.filter((todo) => todo.status === "active"));
    } else if (filter === "completed") {
      setFilteredTodos(allTodos.filter((todo) => todo.status === "completed"));
    }
  }, [filter, allTodos]);

  return { filter, setFilter, filteredTodos, setFilteredTodos };
};
