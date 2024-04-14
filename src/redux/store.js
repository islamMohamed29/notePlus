import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./slices/notes-slice";
import todosSlice from "./slices/todos-slice";
import userSlice from "./slices/user-slice";

const store = configureStore({
  reducer: {
    notes: notesSlice,
    todos: todosSlice,
    user: userSlice,
  },
});

export default store;
