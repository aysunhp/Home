
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/style.scss"
import routes from "./Routes/routes";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
