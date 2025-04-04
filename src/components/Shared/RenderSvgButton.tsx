import { useEffect, useState } from "react";

const RenderSvgButton = ({
  text,
  onClick,
  iconUrl,
  forceSingleLine = false,
}: {
  text: string;
  iconUrl: string;
  onClick: () => void;
  forceSingleLine?: boolean;
}) => {
  const [isSingleLine, setIsSingleLine] = useState(
    forceSingleLine || window.innerWidth <= 1024
  );

  useEffect(() => {
    if (forceSingleLine) return;

    const handleResize = () => {
      setIsSingleLine(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [forceSingleLine]);

  const words = text.split(" ");

  return (
    <button className="importButton" onClick={onClick}>
      <img src={iconUrl} alt="Start Icon" />
      <svg viewBox="0 0 950 250">
        <defs>
          <linearGradient
            id="btnGradient"
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
          className="svgText"
          x="20"
          // y={isSingleLine ? "130" : "100"}
          y="130"
          fill="url(#btnGradient)"
          alignmentBaseline="middle"
        >
          {text}
          {/* {isSingleLine || words.length === 1 ? (
            text
          ) : (
            <>
              <tspan x="20" dy="0">
                {words[0]}{" "}
              </tspan>
              <tspan x="20" dy="100">
                {words.slice(1).join(" ")}{" "}
              </tspan>
            </>
          )} */}
        </text>
      </svg>
    </button>
  );
};

export default RenderSvgButton;
