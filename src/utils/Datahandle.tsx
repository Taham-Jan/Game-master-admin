import { RefObject } from "react";

let topLoaderRef: RefObject<any> | null = null;

function setTopLoaderRef(value: RefObject<any> | null) {
  topLoaderRef = value;
}

function getTopLoaderRef(): RefObject<any> | null {
  return topLoaderRef;
}

export default {
  setTopLoaderRef,
  getTopLoaderRef,
};
