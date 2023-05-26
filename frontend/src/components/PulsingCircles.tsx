import React from "react";
import "./PulsingCircles.scss";
type PropsType = {
  children: React.ReactNode;
};
export default function PulsingCircles({ children }: PropsType) {
  return (
    <div id="outerContainer">
      <div id="container">
        <div className="item">{children}</div>
        <div className="circle" style={{ animationDelay: "0s" }}></div>
        <div className="circle" style={{ animationDelay: "1s" }}></div>
        <div className="circle" style={{ animationDelay: "2s" }}></div>
        <div className="circle" style={{ animationDelay: "3s" }}></div>
      </div>
    </div>
  );
}
