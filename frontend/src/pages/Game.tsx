import React from "react";
import Layout from "../components/Layout";
import GameBoard from "../components/GameBoard";
import ScoreBoard from "../components/ScoreBoard";

export default function Game() {
  return (
    <Layout>
      <GameBoard />
      <ScoreBoard />
    </Layout>
  );
}
