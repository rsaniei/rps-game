import React, { useState } from "react";
import "./GameBoard.css";
import _ from "lodash";
import Weapon from "./Weapon";
import { useGameContext } from "../context/GameContext";
import Timer from "./Timer";
import PulsingCircles from "./PulsingCircles";

export default function GameBoard() {
  const [isWeaponSelected, setIsWeaponSelected] = useState<boolean>(false);
  const [restartGame, setRestartGame] = useState<boolean>(false);
  const [timeOut, setTimeOut] = useState<boolean>(false);
  const gameContext = useGameContext();

  const weapons = [
    { id: "Rock", image: "./images/rock.png" },
    { id: "Paper", image: "./images/paper.png" },
    { id: "Scissors", image: "./images/scissors.png" },
  ];

  const handleRestart = () => {
    setRestartGame(true);
    setIsWeaponSelected(false);
    setTimeOut(false);
  };

  const handleTimeOut = () => {
    gameContext?.setScore(gameContext?.score - 1);
    setTimeOut(true);
  };

  const generateRandomWeapon = () => {
    const randomIndex = _.random(0, weapons.length - 1);
    return weapons[randomIndex];
  };

  const updateWeapons = () => {
    console.log("inside generate result");

    const randWeapon = generateRandomWeapon();
    gameContext?.setComputerWeapon(randWeapon);
    setIsWeaponSelected(true);
  };

  return (
    <div className="game-board">
      {!isWeaponSelected && !timeOut && (
        <>
          <PulsingCircles>
            <Timer seconds={3} handleTimeOut={handleTimeOut} />
          </PulsingCircles>

          <div className="text">Choose:</div>
          <div data-testid="abcd" className="weapons-container">
            {weapons.map((weapon, id) => (
              <Weapon
                key={id}
                weapon={weapon}
                handleClick={updateWeapons}
              ></Weapon>
            ))}
          </div>
        </>
      )}
      {isWeaponSelected && !timeOut && (
        <>
          <span className="text">{`You ${gameContext?.lastResult}!`}</span>
          <div className="weapons-container">
            {gameContext?.playerWeapon && gameContext?.computerWeapon && (
              <>
                <Weapon
                  weapon={gameContext.playerWeapon}
                  backGroundColor="#084f08"
                ></Weapon>
                <Weapon
                  weapon={gameContext.computerWeapon}
                  backGroundColor="#c71a1a"
                ></Weapon>
              </>
            )}
          </div>
        </>
      )}
      {timeOut && (
        <div data-testid="lost" className="text">
          You Lost in this round! :(
        </div>
      )}

      {(timeOut || isWeaponSelected) && (
        <button className="restart" onClick={handleRestart}>
          Play again!
        </button>
      )}
    </div>
  );
}
