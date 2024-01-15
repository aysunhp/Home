import UserRoot from "../pages/user/UserRoot";
import Nopage from "../pages/Nopage";
import Home from "../pages/user/Home";
import Basket from "../pages/user/Basket";
import Wishlist from "../pages/user/Wishlist";
import AddArtist from "../pages/user/AddArtist";

const routes = [
  {
    path: "/",
    element: <UserRoot />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/addartist",
        element: <AddArtist />,
      },
    ],
  },
  {
    path: "*",
    element: <Nopage />,
  },
];

export default routes;
