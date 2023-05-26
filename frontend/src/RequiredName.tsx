import React from "react";
import { Navigate } from "react-router-dom";

type PropsType = {
  children: React.ReactElement;
};

export default function RequiredAuth({ children }: PropsType) {
  const user = sessionStorage.getItem("currentUser");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
