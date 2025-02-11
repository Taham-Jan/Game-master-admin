import React, { useEffect, useRef, useState } from "react";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";

interface RightButtonProps {
  rightButtonIconAxis: string;
  rightButtonAxis: string;
}
interface HeaderProps {
  pageTitle: string;
  showRightButton?: boolean;
  rightButtonText?: string;
  rightButtonIcon?: string;
  onBackClick?: () => void;
  onRightButtonClick?: () => void;
  RightButtonProps?: RightButtonProps;
}

const Header: React.FC<HeaderProps> = ({
  pageTitle,
  showRightButton = false,
  RightButtonProps,
  rightButtonText,
  rightButtonIcon,
  onBackClick,
  onRightButtonClick,
}) => {
  const navigate = useNavigate();
  const handleBackClick = onBackClick || (() => navigate(-1));

  // const [viewBoxes, setViewBoxes] = useState({
  //   back: "0 0 220 80",
  //   title: "0 0 220 80",
  //   right: "0 0 220 80",
  // });

  const textRefs = {
    back: useRef<SVGTextElement>(null),
    title: useRef<SVGTextElement>(null),
    right: useRef<SVGTextElement>(null),
  };

  // useEffect(() => {
  //   const updateViewBox = (key: keyof typeof textRefs) => {
  //     const textElement = textRefs[key].current;
  //     if (textElement) {
  //       const bbox = textElement.getBBox();
  //       setViewBoxes((prev) => ({
  //         ...prev,
  //         [key]: 0 0 ${bbox.width + 30} ${bbox.height + 30},
  //       }));
  //     }
  //   };

  //   Object.keys(textRefs).forEach((key) =>
  //     updateViewBox(key as keyof typeof textRefs)
  //   );
  // }, [pageTitle, rightButtonText]);

  return (
    <header className="header">
      <div className="back-btn-container" onClick={handleBackClick}>
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
          <svg
            className="back-svg-text"
            // viewBox={viewBoxes.back}
            preserveAspectRatio="xMidYMid meet"
          >
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
              ref={textRefs.back}
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

      <span className="header-title-container">
        <img
          src="/images/header/title-label.png"
          alt="Title"
          className="title-icon"
        />
        <svg
          className="title-svg-text"
          // viewBox={viewBoxes.title}
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            ref={textRefs.title}
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="White"
          >
            {pageTitle}
          </text>
        </svg>
      </span>

      <div className="right-btn-container" onClick={onRightButtonClick}>
        <img
          src="/images/header/save-button.png"
          className="right-btn"
          alt="Right Button"
        />
        <div className="right-content">
          {rightButtonIcon && (
            <img
              style={{
                position: "absolute",
                left: RightButtonProps?.rightButtonIconAxis,
              }}
              src={rightButtonIcon}
              alt="Right Icon"
              className="right-icon responsive-img"
            />
          )}
          <svg
            className="right-svg-text"
            // viewBox={viewBoxes.right}
            preserveAspectRatio="xMidYMid meet"
          >
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
              ref={textRefs.right}
              x={RightButtonProps?.rightButtonAxis}
              y="51%"
              textAnchor="start"
              dominantBaseline="middle"
              fill="url(#startBtnGradient)"
            >
              {rightButtonText || "Save Setup"}
            </text>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
