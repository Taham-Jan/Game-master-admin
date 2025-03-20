import React from "react";
import {
  roundOrderCategory,
  roundOrderMiniGame,
} from "../../../types/RoundManagerTypes";

interface RoundManagerOrderCardProps {
  type: "green" | "magenta" | "basic";
  title: string;
  data: (roundOrderCategory | roundOrderMiniGame)[];
  onRemove: (item: roundOrderCategory | roundOrderMiniGame) => void;
}

const RoundManagerOrderCard: React.FC<RoundManagerOrderCardProps> = ({
  type,
  title,
  data,
  onRemove,
}) => {
  return (
    <div className="round-Manager-card-container">
      <div className="round-Manager-card-parent-heading">{title}</div>
      <div className="round-Manager-card-list">
        {data.map((item, index) => (
          <div className={`round-Manager-card ${type}`} key={index}>
            <span className="round-Manager-card-heading">
              {item.type === "category" ? item.categoryName : item.minigame}
            </span>
            <img
              src={`/images/roundManager/game-mode-active-${type}-icon.png`}
              alt="remove item"
              onClick={() => onRemove(item)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoundManagerOrderCard;
