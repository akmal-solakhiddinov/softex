import { useEffect } from "react";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) navigate("/login");
  });
  return children || null;
};

export default ProtectedRoute;
