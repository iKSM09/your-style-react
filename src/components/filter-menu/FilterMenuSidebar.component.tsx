import { MdClose } from "react-icons/md";

import Sidebar from "../sidebar/Sidebar.component";
import FilterMenu from "./FilterMenu.component";
import { useParams } from "@tanstack/router";
import { productListRoute } from "../../pages/product-list/ProductList.route";

type FilterMenuProps = {
  sidebar: boolean;
  closeSidebar: () => void;
};

const FilterMenuSidebar = ({ sidebar, closeSidebar }: FilterMenuProps) => {
  const params = useParams({ from: productListRoute.id });

  return (
    <>
      <Sidebar sidebar={sidebar} closeSidebar={closeSidebar} position="right">
        <FilterMenu
          filterFor={params.for as "men" | "women" | "kids"}
          closeSidebar={closeSidebar}
        />
      </Sidebar>
    </>
  );
};

export default FilterMenuSidebar;
