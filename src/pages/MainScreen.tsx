import React from "react";
import "../styles/MainScreen.css";
import MainStartButton from "../components/MainScreen/MainStartBtn";
import MainNavigationButton from "../components/MainScreen/MainNavigationBtn";
import BackgroundIcon from "../components/MainScreen/BackgroundIcon";

export interface MenuItem {
  text: string;
  img: string;
  navigateTo: string;
}

const menuItems: MenuItem[] = [
  {
    text: "Meme Manager",
    img: "/images/mainScreen/station-icon.png",
    navigateTo: "/categories-meme",
  },
  {
    text: "Round Manager",
    img: "/images/mainScreen/round-icon.png",
    navigateTo: "/round-manager",
  },
  {
    text: "Content Manager",
    img: "/images/mainScreen/content-icon.png",
    navigateTo: "/categories",
  },
];

const MainScreen: React.FC = () => {
  return (
    <div className="main-screen">
      <BackgroundIcon
        src="/images/mainScreen/top-left-icon.png"
        alt="Top Left"
        className="top-left"
      />
      <BackgroundIcon
        src="/images/mainScreen/top-right-icon.png"
        alt="Top Right"
        className="top-right"
      />
      <BackgroundIcon
        src="/images/mainScreen/bottom-left-icon.png"
        alt="Bottom Left"
        className="bottom-left"
      />
      <BackgroundIcon
        src="/images/mainScreen/bottom-right-icon.png"
        alt="Bottom Right"
        className="bottom-right"
      />
      <BackgroundIcon
        src="/images/mainScreen/bottom-center-icon.png"
        alt="Bottom Center"
        className="bottom-center"
      />

      <img
        src="/images/mainScreen/logo.png"
        className="game-logo"
        alt="Game Title"
      />

      <MainStartButton />

      <div className="navigation-container">
        {menuItems.map((item, index) => (
          <MainNavigationButton key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MainScreen;
