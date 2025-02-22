const MainStartButton: React.FC = () => {
  return (
    <button className="startButton">
      <img
        src="/images/mainScreen/start-icon.png"
        height={50}
        alt="Start Icon"
      />
      <svg viewBox="0 0 400 50">
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
        <text className="svgText" x="20" y="45" fill="url(#startBtnGradient)">
          Admin Panel
        </text>
      </svg>
    </button>
  );
};

export default MainStartButton;
