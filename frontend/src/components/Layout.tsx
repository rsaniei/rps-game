import React from "react";
import "./Layout.scss";

type LayoutPropsType = {
  children: React.ReactNode[];
};
export default function Layout({ children }: LayoutPropsType) {
  const [game, score] = children;

  return (
    <div className="container">
      {game}
      {score}
    </div>
  );
}
