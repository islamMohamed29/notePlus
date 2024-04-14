import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "../../firebase";
import { notifySuccess, notifyError } from "../../utils/Notification";

export const addNote = createAsyncThunk(
  "notesSlice/addNote",
  async (note, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingQuickNote(true));
      const userId = auth.currentUser.uid;
      const docRef = await addDoc(collection(db, "notes"), {
        ...note,
        createdAt: new Date().toISOString(),
        userId: userId,
      });
      thunkAPI.dispatch(setLoadingQuickNote(false));
      notifySuccess("Note added successfully");
      return { ...note, id: docRef.id };
    } catch (error) {
      thunkAPI.dispatch(setLoadingQuickNote(false));
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getNotes = createAsyncThunk(
  "notesSlice/getNotes",
  async (_, thunkAPI) => {
    const userId = auth.currentUser.uid;
    try {
      thunkAPI.dispatch(setLoadingGetNotes(true));
      const notes = [];
      const q = query(
        collection(db, "notes"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      thunkAPI.dispatch(setLoadingGetNotes(false));

      return notes;
    } catch (error) {
      thunkAPI.dispatch(setLoadingGetNotes(false));

      console.error("Error getting notes: ", error);

      throw error;
    }
  }
);

export const updateNote = createAsyncThunk(
  "notesSlice/updateNote",
  async ({ noteId, updatedNoteData }, thunkAPI) => {
    try {
      const noteRef = doc(db, "notes", noteId);
      await updateDoc(noteRef, updatedNoteData);
      notifySuccess("Note updated successfully");

      const payload = { noteId, updatedNoteData };
      return payload;
    } catch (error) {
      notifyError("Cannot update now");
      return console.log(error);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notesSlice/deleteNote",
  async (noteId, thunkAPI) => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      notifySuccess("Note deleted successfully");

      return noteId;
    } catch (error) {
      console.error("Error deleting note: ", error);

      notifyError("Cannot delete now");

      throw error;
    }
  }
);
const initialState = {
  notes: [],
  selectedNote: "",
  loadingQuickNote: false,
  loadingGetNotes: false,
};
const notesSlice = createSlice({
  initialState,
  name: "notesSlice",
  reducers: {
    clearNotes(state, action) {
      state.notes = [];
    },
    setSelectedNote(state, action) {
      state.selectedNote = action.payload;
    },
    setLoadingQuickNote(state, action) {
      state.loadingQuickNote = action.payload;
    },
    setLoadingGetNotes(state, action) {
      state.loadingGetNotes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.notes.unshift({
        ...action.payload,
        createdAt: new Date().toISOString(),
      });
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      const { noteId, updatedNoteData } = action.payload;
      const index = state.notes.findIndex((note) => note.id === noteId);
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], ...updatedNoteData };
        if (state.selectedNote && state.selectedNote.id === noteId) {
          state.selectedNote = { ...state.selectedNote, ...updatedNoteData };
        }
      }
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    });
  },
});

export const {
  clearNotes,
  setSelectedNote,
  setLoadingQuickNote,
  setLoadingGetNotes,
} = notesSlice.actions;
export default notesSlice.reducer;
