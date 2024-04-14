import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { notifyError, notifySuccess } from "../../utils/Notification";

export const addTodo = createAsyncThunk(
  "todosSlice/addTodo",
  async (todo, thunkAPI) => {
    try {
      const userId = auth.currentUser.uid;
      const docRef = await addDoc(collection(db, "todos"), {
        ...todo,
        createdAt: new Date().toISOString(),
        userId: userId,
      });
      notifySuccess("Todo added successfully");
      return { ...todo, id: docRef.id };
    } catch (error) {
      console.log(error);
    }
  }
);
export const getTodos = createAsyncThunk(
  "todosSlice/getTodos",
  async (_, thunkAPI) => {
    const userId = auth.currentUser.uid;
    try {
      thunkAPI.dispatch(setLoadingGetTodos(true));
      const todos = [];
      const q = query(
        collection(db, "todos"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() });
      });
      thunkAPI.dispatch(setLoadingGetTodos(false));

      return todos;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(setLoadingGetTodos(false));
    }
  }
);
export const toggleTodoStatus = createAsyncThunk(
  "todosSlice/toggleTodoStatus",
  async (todoId, thunkAPI) => {
    try {
      const todoRef = doc(db, "todos", todoId);
      const todoSnapshot = await getDoc(todoRef);
      const todoData = todoSnapshot.data();
      const currentStatus = todoData.status;
      const newStatus = currentStatus === "completed" ? "active" : "completed";
      await updateDoc(todoRef, {
        status: newStatus,
      });
      notifySuccess("Todo status updated successfully");
      return { todoId, newStatus };
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteAllTodos = createAsyncThunk(
  "todosSlice/deleteAllTodos",
  async (_, thunkAPI) => {
    try {
      const userId = auth.currentUser.uid;
      const q = query(collection(db, "todos"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      notifySuccess("All todos deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteCompletedTodos = createAsyncThunk(
  "todosSlice/deleteCompletedTodos",
  async (_, thunkAPI) => {
    try {
      const userId = auth.currentUser.uid;
      const q = query(
        collection(db, "todos"),
        where("userId", "==", userId),
        where("status", "==", "completed")
      );
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      notifySuccess("Completed todos deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteTodo = createAsyncThunk(
  "todosSlice/deleteTodo",
  async (todoId, thunkAPI) => {
    try {
      await deleteDoc(doc(db, "todos", todoId));
      // notifySuccess("Todo deleted successfully");
      return todoId;
    } catch (error) {
      console.log(error);
      // notifyError("Cannot delete now");
    }
  }
);
export const updateTodo = createAsyncThunk(
  "todosSlice/updateTodo",
  async ({ todoId, updatedTodoData }, thunkAPI) => {
    try {
      const todoRef = doc(db, "todos", todoId);
      await updateDoc(todoRef, updatedTodoData);
      return { todoId, updatedTodoData };
    } catch (error) {
      notifyError("Cannot update now");
    }
  }
);
const initialState = {
  todos: [],
  selectedTodo: "",
  loadingGetTodos: false,
};

const todosSlice = createSlice({
  initialState,
  name: "todosSlice",
  reducers: {
    setSelectedTodo(state, action) {
      state.selectedTodo = action.payload;
    },
    clearTodos(state, action) {
      state.todos = [];
    },
    setLoadingGetTodos(state, action) {
      state.loadingGetTodos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todos.unshift({
        ...action.payload,
        createdAt: new Date().toISOString(),
      });
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(toggleTodoStatus.fulfilled, (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      if (todoIndex !== -1) {
        state.todos[todoIndex].status = action.payload.newStatus;
      }
    });
    builder.addCase(deleteAllTodos.fulfilled, (state, action) => {
      state.todos = [];
    });
    builder.addCase(deleteCompletedTodos.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.status !== "completed");
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const { todoId, updatedTodoData } = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === todoId);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...updatedTodoData };
        if (state.selectedTodo && state.selectedTodo.id === todoId) {
          state.selectedTodo = { ...state.selectedTodo, ...updatedTodoData };
        }
      }
    });
  },
});
export const { clearTodos, setSelectedTodo, setLoadingGetTodos } =
  todosSlice.actions;
export default todosSlice.reducer;
