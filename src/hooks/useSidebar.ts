import { useState } from "react";

const useSidebar = (initialValue = false) => {
  const [sidebar, setSidebar] = useState(initialValue);

  const toggleSidebar = () => setSidebar((bool) => !bool);
  const openSidebar = () => setSidebar(true);
  const closeSidebar = () => setSidebar(false);

  return [sidebar, openSidebar, closeSidebar, toggleSidebar] as const;
};

export default useSidebar;
