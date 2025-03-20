import React from "react";

interface RoundManagerMiniGameCardProps {
  type: "green" | "magenta" | "basic";
  title: string;
  data: string[];
  onSelect: (minigame: string, index: number) => void;
  selectedIndexes: number[];
}

const RoundManagerMiniGameCard: React.FC<RoundManagerMiniGameCardProps> = ({
  type,
  title,
  data,
  onSelect,
  selectedIndexes,
}) => {
  return (
    <div className="round-Manager-card-container">
      <div className="round-Manager-card-parent-heading">{title}</div>
      <div className="round-Manager-card-list">
        {data.map((minigame, index) => {
          const isSelected = selectedIndexes.includes(index);
          return (
            <div
              className={`round-Manager-card ${type} ${
                isSelected ? "disabled" : ""
              }`}
              key={index}
            >
              <span className="round-Manager-card-heading">{minigame}</span>
              <img
                src={`/images/roundManager/game-mode-active-${type}-icon.png`}
                alt="select minigame"
                onClick={() => !isSelected && onSelect(minigame, index)}
                style={{
                  cursor: isSelected ? "not-allowed" : "pointer",
                  opacity: isSelected ? 0.5 : 1,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoundManagerMiniGameCard;
