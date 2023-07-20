import { MdClose } from "react-icons/md";

import Sidebar from "../sidebar/Sidebar.component";
import FilterMenu from "./FilterMenu.component";

type FilterMenuProps = {
  sidebar: boolean;
  closeSidebar: () => void;
};

const FilterMenuSidebar = ({ sidebar, closeSidebar }: FilterMenuProps) => {
  return (
    <>
      <Sidebar sidebar={sidebar} closeSidebar={closeSidebar} position="right">
        <FilterMenu closeSidebar={closeSidebar} />
      </Sidebar>
    </>
  );
};

export default FilterMenuSidebar;
