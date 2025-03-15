import React from "react";

interface RoundManagerCardProps {
  type: "green" | "magenta" | "basic";
  title: string;
  data: string[];
}

const sampleData = [
  "Classic Quiz",
  "Classic Quiz",
  "Classic Quiz",
  "Classic Quiz",
  "Classic Quiz",
];
const RoundManagerCard: React.FC<RoundManagerCardProps> = ({
  type,
  title,
  data = sampleData,
}) => {
  return (
    <div className="round-Manager-card-container">
      <div className="round-Manager-card-parent-heading">{title}</div>
      <div className="round-Manager-card-list">
        {data.map((e, index) => (
          <div className={`round-Manager-card ${type}`} key={index}>
            <span className="round-Manager-card-heading">{e}</span>
            <img
              src={`/images/roundManager/game-mode-active-${type}-icon.png`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoundManagerCard;
