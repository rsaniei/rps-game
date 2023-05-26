import React, { useEffect } from "react";
import "./ScoreBoard.scss";
import { useGameContext } from "../context/GameContext";
import _ from "lodash";
import classNames from "classnames";
import { userType } from "../types/GameContextTypes";

export default function ScoreBoard() {
  const gameContext = useGameContext();

  useEffect(() => {
    //get currentUser and score from sessionStorgae after page refresh
    if (!gameContext?.currentUser) {
      const user = sessionStorage.getItem("currentUser");
      const userScore = sessionStorage.getItem("score");
      gameContext?.setCurrentUser(`${user}`);
      gameContext?.setScore(Number(userScore));
    }
  }, []);

  useEffect(() => {
    gameContext?.updateResults();
  }, [gameContext?.playerWeapon]);

  useEffect(() => {
    console.log("inside scoreboard => fetch users");

    fetchUsersFromServer();
  }, [gameContext?.score, gameContext?.playerWeapon]);

  function fetchUsersFromServer() {
    fetch("/users")
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        const sortedUsers = _.orderBy(users, "score", "desc");
        gameContext?.setUsers(sortedUsers);
      });
  }
  return (
    <div className="score-board">
      <div>
        <h2 className="score-name">
          <b>{`${gameContext?.currentUser} (you!) `} </b>
          <span> vs </span>
          <b> Computer</b>
        </h2>

        <ul className="ulist">
          <li className="litem">
            <span data-testid="score">{"Your total score"}</span>
            <span>{gameContext?.score}</span>
          </li>
          <li className="description">your detailed scores in this session:</li>
          <li key="win" className="litem">
            <span>Wins</span>
            <span data-testid="wins">{gameContext?.results.wins}</span>
          </li>
          <li key="draws" className="litem">
            <span>Draws</span>
            <span data-testid="draws">{gameContext?.results.draws}</span>
          </li>
          <li key="loses" className="litem">
            <span>Loses</span>
            <span data-testid="loses">{gameContext?.results.loses}</span>
          </li>
        </ul>
      </div>

      <div>
        <h2>Leader board</h2>
        <ul className="ulist">
          {gameContext?.users?.map(
            (user: userType, index: number) =>
              user.score > 0 && (
                <li
                  key={user._id}
                  className={classNames(
                    { litem: true },
                    { highlighted: user.userName === gameContext?.currentUser }
                  )}
                >
                  <span>{user.userName}</span>
                  <span data-testid="user-score">{user.score}</span>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}
