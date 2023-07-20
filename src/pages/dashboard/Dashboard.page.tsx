import { Link, Route } from "@tanstack/router";
import useCurrentUser from "../../hooks/useAuthStateChange";
import styled from "styled-components";
import { deviceWidth } from "../../styles/devices.breakpoints";
import AddProductIcon from "../../components/button/AddProductIcon.component";
import { getAllPaths } from "../add-product/AddProduct.page";
import { productRoute } from "../product/Product.page";
import { productsStore } from "../../store/products.store";
import { userRoute } from "../user/user-route";

export const DashboardContainer = styled.main`
  margin: 1rem;
`;

export const DashboardHeader = styled.section`
  margin-bottom: 1rem;
  padding-bottom: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid var(--outline);

  @media screen and (${deviceWidth.ltTablet}) {
    font-size: 12px;
    justify-content: flex-start;
  }
`;

export const DashboardTitle = styled.div`
  display: flex;
  gap: 8px;
  align-items: baseline;
`;

export const ButtonLink = styled(Link)`
  padding: 0.75rem 1.2rem;
  color: var(--on-secondary-container);
  background-color: var(--secondary-container);
  border-radius: 0.75rem;

  display: inline-flex;
  gap: 0.4rem;
  justify-content: center;
  align-items: center;

  :hover,
  :focus {
    color: var(--on-primary-container);
    background-color: var(--primary-container);
  }
`;

export const sellerDashboardRoute = new Route({
  getParentRoute: () => userRoute,
  path: "/dashboard",
});

export const sellerDashboardIndexRoute = new Route({
  getParentRoute: () => sellerDashboardRoute,
  path: "/",
  component: Dashboard,
});

export default function Dashboard() {
  const allPaths = getAllPaths();
  const user = useCurrentUser();
  const products = productsStore((state) => state.products);

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>
          <h2>Welcome, {user?.displayName}</h2>
          <small className="hide-from-mobile">({user?.email})</small>
        </DashboardTitle>
      </DashboardHeader>
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Your Product List</h3>
          <Link
            to="/user/$userId/dashboard/addProduct"
            params={{
              userId: `${user?.email}`,
            }}
          >
            <AddProductIcon size="1.5rem" />
          </Link>
        </div>
        {/* <div>Your product list</div> */}
        <section>
          {products
            .filter((product) => product.postedBy === user?.email)
            .map((item) => (
              <div
                key={item.id}
                style={{
                  margin: "0.5rem",
                  backgroundColor: "var(--primary)",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <img
                  src={item.colors[0].images[0]}
                  alt={`${item.name} preview image`}
                  style={{
                    width: "10rem",
                    objectFit: "contain",
                    aspectRatio: "4 / 5",
                  }}
                />

                <div style={{ textAlign: "start", paddingTop: "1rem" }}>
                  <Link
                    from={productRoute.id}
                    to="/store/$for/$productId"
                    params={{
                      for: item.category.split("/")[0],
                      productId: item.id,
                    }}
                  >
                    <h4>{item.name}</h4>
                  </Link>
                  <p>{item.description}</p>
                  <p>Product Price: {item.price}</p>
                  <p>Available Sizes: {item.sizes}</p>
                </div>
              </div>
            ))}
        </section>
      </section>
    </DashboardContainer>
  );
}
