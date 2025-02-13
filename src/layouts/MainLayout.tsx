import { ReactNode, useMemo } from "react";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const backgroundMappings: { pattern: RegExp; background: string }[] = [
    { pattern: /^\/$/, background: "url('/images/backgrounds/home-bg.png')" },
    {
      pattern: /^\/categories/,
      background: "url('/images/backgrounds/app-bg.png')",
    },
    {
      pattern: /^\/categories-form/,
      background: "url('/images/backgrounds/app-bg.png')",
    },
    {
      pattern: /^\/categories-questions/,
      background: "url('/images/backgrounds/app-bg.png')",
    },
    {
      pattern: /^\/categories-questions-form/,
      background: "url('/images/backgrounds/app-bg.png')",
    },
  ];

  const background = useMemo(() => {
    return (
      backgroundMappings.find(({ pattern }) => pattern.test(location.pathname))
        ?.background || "url('/images/backgrounds/default-bg.png')"
    );
  }, [location.pathname]);

  return (
    <div className="full-page" style={{ backgroundImage: background }}>
      {children}
    </div>
  );
};
export default MainLayout;
