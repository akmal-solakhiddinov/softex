import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";

interface Props {
  children: ReactNode;
}

const ProtectedRoute:React.FC <Props>= ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) navigate("/login");
  });
  return children || null;
};

export default ProtectedRoute;
