import React from "react";

interface RoundManagerCardProps {
  title: string;
}

const RoundManagerCard: React.FC<RoundManagerCardProps> = ({ title }) => {
  return (
    <div className="round-Manager-card-container">
      <div className="round-Manager-card-heading">{title}</div>
      <div className="round-Manager-card-list">
        <ul>
          <li>Auto</li>
          <li>Manual</li>
        </ul>
      </div>
    </div>
  );
};

export default RoundManagerCard;
