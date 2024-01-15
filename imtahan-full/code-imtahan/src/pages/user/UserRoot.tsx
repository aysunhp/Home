import { Outlet } from "react-router-dom";
import Navbar from "../../layout/Navbar";

const UserRoot = () => {
  return (
    <>
      <Navbar />;
      <Outlet />
    </>
  );
};

export default UserRoot;
