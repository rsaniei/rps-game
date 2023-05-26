import React, { useState, useContext, createContext, useEffect } from "react";
import {
  weaponType,
  resultsType,
  userType,
  lastResultType,
} from "../types/GameContextTypes";
type PropsType = {
  children: React.ReactElement;
};

type contextType = {
  playerWeapon: weaponType | null;
  setPlayerWeapon: (w: weaponType) => void;
  computerWeapon: weaponType | null;
  setComputerWeapon: (w: weaponType) => void;
  score: number;
  setScore: (v: number) => void;
  results: resultsType;
  setResults: (v: resultsType) => void;
  updateResults: () => void;
  currentUser: string | null;
  setCurrentUser: (v: string) => void;
  users: userType[] | null;
  setUsers: (v: userType[] | null) => void;
  lastResult: lastResultType;
  timeOut: boolean;
  setTimeOut: (v: boolean) => void;
};

export const GameContext = createContext<contextType | null>(null);

export default function GameContextProvider({ children }: PropsType) {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [users, setUsers] = useState<userType[] | null>([]);
  const [lastResult, setLastResult] = useState<lastResultType | null>(null);

  const [playerWeapon, setPlayerWeapon] = useState<weaponType | null>(null);
  const [computerWeapon, setComputerWeapon] = useState<weaponType | null>(null);
  const [timeOut, setTimeOut] = useState<boolean>(false);
  const [results, setResults] = useState<resultsType>({
    wins: 0,
    loses: 0,
    draws: 0,
  });

  useEffect(() => {
    function updateScore() {
      const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentUser, score }),
      };
      fetch(`/users/updateScore`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          sessionStorage.setItem("score", JSON.stringify(score));
        });
    }
    updateScore();
  }, [score, currentUser]);

  const updateResults = () => {
    let newResults = results;

    if (playerWeapon !== null) {
      if (playerWeapon?.id === computerWeapon?.id) {
        setResults({ ...results, draws: results.draws + 1 });
        setScore(score);
        setLastResult("drew");
      } else if (
        (playerWeapon?.id === "Rock" && computerWeapon?.id === "Scissors") ||
        (playerWeapon?.id === "Paper" && computerWeapon?.id === "Rock") ||
        (playerWeapon?.id === "Scissors" && computerWeapon?.id === "Paper")
      ) {
        newResults.wins++;
        setResults(newResults);
        setScore(score + 1);
        setLastResult("won");
      } else {
        newResults.loses++;
        setResults(newResults);
        setScore(score - 1);
        setLastResult("lost");
      }
    }
  };

  return (
    <GameContext.Provider
      value={{
        playerWeapon,
        setPlayerWeapon,
        computerWeapon,
        setComputerWeapon,
        results,
        setResults,
        updateResults,
        score,
        setScore,
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        lastResult,
        timeOut,
        setTimeOut,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
export const useGameContext = () => useContext(GameContext);
