const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="back-btn-container" onClick={onClick}>
    <img
      src="/images/header/back-button.png"
      className="back-btn"
      alt="Back Button"
    />
    <div className="back-content">
      <img
        src="/images/header/back-icon.png"
        alt="Back Icon"
        className="back-icon"
      />
      <svg className="back-svg-text" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient
            id="textGradient"
            x1="100%"
            y1="50%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#ffffff", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#94cbff", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <text
          x="2%"
          y="51%"
          textAnchor="start"
          dominantBaseline="middle"
          fill="url(#textGradient)"
        >
          Back
        </text>
      </svg>
    </div>
  </div>
);

export default BackButton;
