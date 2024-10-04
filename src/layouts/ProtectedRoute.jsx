import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/" redirect></Navigate>;
  }
  return (
    <>
      <div>ProtectedRoute</div>
      <Outlet></Outlet>
    </>
  );
};
