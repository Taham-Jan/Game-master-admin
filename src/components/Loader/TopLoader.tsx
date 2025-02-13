import React, { useImperativeHandle, useState } from "react";
import Loader from "./loader";

const TopLoader = (props: any, forwardedRef: any) => {
  const [isVisibale, setIsVisible] = useState(false);

  const hideMoadl = () => {
    setIsVisible(false);
  };

  useImperativeHandle(forwardedRef, () => ({
    show: () => {
      setIsVisible(true);
    },
    hide: () => {
      hideMoadl();
    },
  }));

  if (isVisibale) {
    return <Loader />;
  }
  return null;
};

export default React.forwardRef(TopLoader);
