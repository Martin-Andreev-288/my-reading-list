import { RouterProvider, createBrowserRouter } from "react-router";
import { Home, Login, SignUp, Error } from "./pages";
import { AuthContextProvider } from "./context/AuthContext";
import { ProtectedRoute, UnprotectedRoute } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <UnprotectedRoute>
        <Login />
      </UnprotectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <UnprotectedRoute>
        <SignUp />
      </UnprotectedRoute>
    ),
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
