import { Outlet, Navigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const ProtectRoutes = () => {
  const username = useUserStore((state) => state.username);

  if (!username || username === "") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectRoutes;
