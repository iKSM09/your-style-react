import { Link, Route } from "@tanstack/router";
import useCurrentUser from "../../hooks/useAuthStateChange";
import styled from "styled-components";
import { deviceWidth } from "../../styles/devices.breakpoints";
import { getAllPaths } from "../add-product/AddProduct.page";
import { productsStore } from "../../store/products.store";
import { productRoute } from "../product/Product.route";
import { useEffect } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Button } from "../../components/_ui/button/Button.styles";
import Icon from "../../components/_ui/button/Icon.components";

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

export const ProductCard = styled.div`
  margin: 1rem 0;
  height: fit-content;
  color: var(--on-secondary-container);
  background-color: var(--secondary-container);
  display: flex;
  align-items: flex-start;
  border-radius: var(--border-curved);
  overflow: hidden;

  img {
    padding: 0;
    width: 9rem;
    height: 100%;
    object-fit: contain;
    /* aspect-ratio: 2 / 3; */
  }
`;

export const ProductDetails = styled.div`
  padding: 0.7rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  justify-content: space-between;
  align-items: stretch;
  text-align: start;

  /* .product-info {
  } */

  .product-btns {
    display: flex;
    flex-direction: row-reverse;
    gap: 0.7rem;
  }
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

const Dashboard = () => {
  const allPaths = getAllPaths();
  const user = useCurrentUser();
  const products = productsStore((state) => state.products);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

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
            <Icon.AddProduct $curved />
          </Link>
        </div>
        {/* <div>Your product list</div> */}
        <section>
          {products
            .filter((product) => product.postedBy === user?.email)
            .map((item) => (
              <ProductCard key={item.id}>
                <img
                  src={item.colors[0].images[0]}
                  alt={`${item.name} preview image`}
                />

                <ProductDetails>
                  <div className="product-info">
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
                    <p>Product Price: {item.price}</p>
                    <p>Available Sizes: {item.sizes}</p>
                  </div>
                  <div className="product-btns">
                    <Icon.Delete $secondary $curved />
                    <Button $curved>Edit Details</Button>
                  </div>
                </ProductDetails>
              </ProductCard>
            ))}
        </section>
      </section>
    </DashboardContainer>
  );
};

export default Dashboard;
