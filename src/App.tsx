import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Overview from "./routes/overview/Overview";
import CreateUser from "./routes/create/CreateUser";
import Root from "./routes/Root";
import { UserContext } from "./context/UserContext";
import userReducer from "./hooks/UserReducer";
import { usePersistedReducer } from "./hooks/usePersistedReducer";

function App() {
  const [users, setUsers] = usePersistedReducer(userReducer, "users", []);

  const router = createBrowserRouter([
    {
      path: "/user-management-app",
      element: <Root />,
      children: [
        { path: "overview", element: <Overview /> },
        { path: "create", element: <CreateUser /> },
        {
          path: "edit",
          children: [
            {
              path: ":itemId",
              element: <CreateUser />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
