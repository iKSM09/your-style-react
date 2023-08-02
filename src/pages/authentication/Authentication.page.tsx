import { useEffect } from "react";

const Authentication = () => {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return <div>Authentication (Login / Register)</div>;
};

export default Authentication;
