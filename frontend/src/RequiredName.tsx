import React from "react";
import { Navigate } from "react-router-dom";

type PropsType = {
  children: React.ReactElement;
};

export default function RequiredAuth({ children }: PropsType) {
  console.log("inside required Auth");
  const user = sessionStorage.getItem("currentUser");
  if (!user) {
    console.log("No USER!");
    return <Navigate to="/login" replace />;
  }
  return children;
}
