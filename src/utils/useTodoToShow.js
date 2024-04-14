import { useEffect, useState } from "react";

export const useTodoToShow = (allTodos) => {
  const [todosToShow, setTodosToShow] = useState(10);
  useEffect(() => {
    setTodosToShow(10);
  }, [allTodos.length]);
  return { todosToShow, setTodosToShow };
};
