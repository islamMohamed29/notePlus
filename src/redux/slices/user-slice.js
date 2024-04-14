import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { notifyError } from "../../utils/Notification";

const initialState = {
  user: null,
  loadingAuth: false,
  isAvatarSet: false,
};

export const signUp = createAsyncThunk(
  "userSlice/signUp",
  async (userData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAuth(true));
      const { email, password, username, avatar } = userData;
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      let imageURL = null;
      if (avatar) {
        const fileRef = ref(storage, `images/${user.uid + "_" + avatar?.name}`);
        await uploadBytes(fileRef, avatar);
        imageURL = await getDownloadURL(fileRef);
      }
      await updateProfile(user, {
        displayName: username,
        photoURL: imageURL,
      });
      const { uid, displayName, email: userEmail, photoURL } = user;
      thunkAPI.dispatch(setLoadingAuth(false));

      return { uid, displayName, email: userEmail, photoURL };
    } catch (error) {
      thunkAPI.dispatch(setLoadingAuth(false));
      notifyError("An error occurred. Please check your data or try again.");
    }
  }
);
export const signIn = createAsyncThunk(
  "userSlice/signIn",
  async (userData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAuth(true));
      const { email, password } = userData;
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const { uid, displayName, email: userEmail, photoURL } = user;
      thunkAPI.dispatch(setLoadingAuth(false));
      return { uid, displayName, email: userEmail, photoURL };
    } catch (error) {
      thunkAPI.dispatch(setLoadingAuth(false));
      notifyError("An error occurred. Please check your data or try again.");
    }
  }
);
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateAvatar: (state, action) => {
      state.user.photoURL = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLoadingAuth(state, action) {
      state.loadingAuth = action.payload;
    },
    setAvatarWhenRegister(state, action) {
      state.isAvatarSet = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const {
  updateAvatar,
  clearUser,
  setLoadingAuth,
  setAvatarWhenRegister,
  setUser,
} = userSlice.actions;
export default userSlice.reducer;
