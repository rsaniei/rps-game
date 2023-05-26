import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";

import "./Login.css";

export default function Login() {
  const [name, setName] = useState<string>("");
  const [showRules, setShowRules] = useState<boolean>(false);
  const navigate = useNavigate();
  const gameContext = useGameContext();

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    };
    fetch("/users/login", requestOption)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        gameContext?.setCurrentUser(data.userName);
        gameContext?.setScore(data.score);
        //store user data in sessionStorage
        sessionStorage.setItem("currentUser", data.userName);
        sessionStorage.setItem("score", JSON.stringify(data.score));
        setShowRules(true);
      });
  };
  function handleStart() {
    setShowRules(false);
    navigate("/", { replace: true });
  }
  return (
    <div className="login-container">
      {!showRules && (
        <form action="" className="form-container">
          <h1>Hey! Enter your name:</h1>
          <input
            aria-label="name-input"
            className="input"
            type="email"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-button" onClick={handleLogin}>
            Enter
          </button>
        </form>
      )}
      {showRules && (
        <div className="form-container">
          <h2 className="h2">{`Welcome ${name}!`}</h2>
          <p className="first-paraph">
            You are about to start the game! Let's quickly review the rules:{" "}
          </p>
          <ul className="rules-ulist">
            <li>In each round you can select Rock, Paper or Scissors.</li>
            <li>
              If both choose the same weapon, then it’s a <b>DRAW</b>.
            </li>
            <li>
              <b>Rock</b> wins against <b>Scissors</b>
            </li>
            <li>
              <b>Scissors</b> wins against <b>Paper</b>
            </li>
            <li>
              <b>Paper</b> wins against <b>Rock</b>
            </li>
            <li>
              You have <b>3</b> seconds to chose your weapon.
            </li>
          </ul>
          <div className="ready">Ready?</div>
          <button
            data-testid="start"
            className="start-button"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
}
