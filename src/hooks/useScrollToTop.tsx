import { useEffect } from "react";

const useScrollToTop = (dependencyList: any[]) => {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      // Optional if you want to skip the scrolling animation
      // behavior: "instant",
    });
  }, [...dependencyList]);

  return;
};

export default useScrollToTop;
