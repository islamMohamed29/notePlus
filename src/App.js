import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Addnote from "./Components/Addnote";
import Addtodo from "./Components/Addtodo";
import LayOut from "./Components/LayOut";
import { ProtectedRoute } from "./utils/ProtectedRoute ";
import { AuthRoute } from "./utils/AuthRoute";
import Alltodos from "./Components/Alltodos";
import AuthListener from "./utils/AuthListener";

export default function App() {
  const router = createHashRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/notes",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/todos",
          element: (
            <ProtectedRoute>
              <Alltodos />
            </ProtectedRoute>
          ),
        },
        {
          path: "/addNote",
          element: (
            <ProtectedRoute>
              <Addnote />
            </ProtectedRoute>
          ),
        },
        {
          path: "/addTodo",
          element: (
            <ProtectedRoute>
              <Addtodo />
            </ProtectedRoute>
          ),
        },

        {
          path: "/signin",
          element: (
            <AuthRoute>
              <Signin />
            </AuthRoute>
          ),
        },
        {
          path: "/signup",
          element: (
            <AuthRoute>
              <Signup />
            </AuthRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <AuthListener>
      <RouterProvider router={router}></RouterProvider>
    </AuthListener>
  );
}
