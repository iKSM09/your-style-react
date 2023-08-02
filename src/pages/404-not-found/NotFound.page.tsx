import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return <div>404</div>;
};

export default NotFound;
