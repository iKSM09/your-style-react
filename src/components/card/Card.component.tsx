import { Link } from "@tanstack/router";

import blackJacket from "/assets/black_01.jpeg";
import { productRoute } from "../../pages/product/Product.page";
import { CardContainer, CardInfo, Image, ImageContainer } from "./Card.styles";

const Card = () => {
  return (
    <CardContainer>
      <Link
        from={productRoute.id}
        to="/store/$for/$productId"
        params={{ for: "men", productId: "topwear" }}
        activeOptions={{ exact: true }}
      >
        <ImageContainer>
          <Image src={blackJacket} alt="black Jacket" />
        </ImageContainer>
        <CardInfo>
          <h3>Product Name</h3>
          <p>Price: ₹299</p>
        </CardInfo>
      </Link>
    </CardContainer>
  );
};

export default Card;
