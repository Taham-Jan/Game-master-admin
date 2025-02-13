import { Ref } from "react";

let topLoaderRef: Ref<any> | undefined = null;
function setTopLoaderRef(value: Ref<any> | undefined) {
  topLoaderRef = value;
}

function getTopLoaderRef() {
  return topLoaderRef;
}

export default {
  setTopLoaderRef,
  getTopLoaderRef,
};
