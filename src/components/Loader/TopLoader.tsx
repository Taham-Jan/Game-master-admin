import React, { forwardRef, useImperativeHandle, useState } from "react";
import Loader from "./loader";
import { ImCross } from "react-icons/im";

interface TopLoaderHandle {
  show: (text?: string, controller?: AbortController) => void;
  hide: () => void;
}

const TopLoader = forwardRef<TopLoaderHandle>((_, ref) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loaderText, setLoaderText] = useState<string>("Loading");
  const [controller, setController] = useState<AbortController | null>(null);

  const hideLoader = () => {
    setIsVisible(false);
    setController(null);
  };

  useImperativeHandle(ref, () => ({
    show: (text = "Loading", newController = null) => {
      setLoaderText(text);
      setController(newController);
      setIsVisible(true);
    },
    hide: hideLoader,
  }));

  return isVisible ? (
    <div className="top-loader-container">
      <Loader text={loaderText} />
      {controller && (
        <ImCross
          className="top-loader-cancel-button"
          onClick={() => controller.abort()}
        />
      )}
    </div>
  ) : null;
});

export default TopLoader;
