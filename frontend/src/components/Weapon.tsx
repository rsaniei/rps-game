import { type } from "os";
import React from "react";
import { useGameContext } from "../context/GameContext";
import { weaponType } from "../types/GameContextTypes";
import "./Weapon.css";

type WeaponProps = {
  weapon: weaponType;
  backGroundColor?: string;
  handleClick?: () => void;
};

export default function Weapon({
  weapon,
  backGroundColor,
  handleClick,
}: WeaponProps) {
  const { id, image } = weapon;
  const gameContext = useGameContext();
  return (
    <div
      data-testid="weapon-element"
      className="main-container"
      onClick={() => {
        if (handleClick) {
          gameContext?.setPlayerWeapon(weapon);
          handleClick();
        }
      }}
    >
      <div
        className="image-container"
        style={{ backgroundColor: backGroundColor }}
      >
        <img
          data-testid="weapon-image"
          src={image}
          alt="weapon"
          width={"130px"}
          height={"130px"}
        />
      </div>
      <div id="id" data-testid="weapon-id" className="text">
        {id}
      </div>
    </div>
  );
}
