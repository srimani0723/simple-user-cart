import { Navigate } from "react-router-dom";
import { setActivePage } from "../redux/allStates";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");

  if (!jwtToken) {
    dispatch(setActivePage("Login"));
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
