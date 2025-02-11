export interface RightButtonProps {
  text: string;
  icon?: string;
  iconPosition?: string;
  textPosition?: string;
  onClick?: () => void;
}

const RightButton: React.FC<RightButtonProps> = ({
  text,
  icon,
  iconPosition,
  textPosition,
  onClick,
}) => (
  <div className="right-btn-container" onClick={onClick}>
    <img
      src="/images/header/save-button.png"
      className="right-btn"
      alt="Right Button"
    />
    <div className="right-content">
      {icon && (
        <img
          style={{ position: "absolute", left: iconPosition }}
          src={icon}
          alt="Right Icon"
          className="right-icon responsive-img"
        />
      )}
      <svg className="right-svg-text" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient
            id="startBtnGradient"
            x1="100%"
            y1="50%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#e6fbff", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#96ffaa", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <text
          x={textPosition}
          y="51%"
          textAnchor="start"
          dominantBaseline="middle"
          fill="url(#startBtnGradient)"
        >
          {text || "Save Setup"}
        </text>
      </svg>
    </div>
  </div>
);

export default RightButton;
