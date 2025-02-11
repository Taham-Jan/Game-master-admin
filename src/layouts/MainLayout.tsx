import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const backgrounds: Record<string, string> = {
    "/": "url('/images/backgrounds/home-bg.png')",
    "/categories": "url('/images/backgrounds/app-bg.png')",
    "/categories-form": "url('/images/backgrounds/app-bg.png')",
    "/categories-questions-form": "url('/images/backgrounds/app-bg.png')",
  };

  const dynamicBackgroundPattern: { pattern: RegExp; background: string }[] = [
    {
      pattern: /\/categories-questions\/\d+/,
      background: "url('/images/backgrounds/app-bg.png')",
    },
  ];
  const staticBackground = backgrounds[location.pathname];

  const dynamicBackground = dynamicBackgroundPattern.find(({ pattern }) =>
    pattern.test(location.pathname)
  )?.background;

  const background =
    staticBackground ||
    dynamicBackground ||
    "url('/images/backgrounds/default-bg.png')";

  return (
    <div className="full-page" style={{ backgroundImage: background }}>
      {children}
    </div>
  );
};
export default MainLayout;
