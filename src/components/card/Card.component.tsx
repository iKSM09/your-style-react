import { Link } from "@tanstack/router";

import { productRoute } from "../../pages/product/Product.page";
import { CardContainer, CardInfo, Image, ImageContainer } from "./Card.styles";
import { AddProductTypes } from "../../pages/add-product/AddProduct.page";

type CardProps = {
  productInfo: AddProductTypes;
};

const Card = ({ productInfo }: CardProps) => {
  const previewsImage = productInfo.colors[0].images[0];
  // const category = productInfo.category.split("/")[0];

  return (
    <CardContainer>
      <Link
        from={productRoute.id}
        to="/store/$for/$productId"
        params={{
          for: productInfo.category.split("/")[0],
          productId: productInfo.id,
        }}
        // search={productInfo}
        activeOptions={{ exact: true }}
      >
        <ImageContainer>
          <Image src={previewsImage} alt={`${productInfo.name} preview`} />
        </ImageContainer>
        <CardInfo>
          <h3>{productInfo.name}</h3>
          <p>Price: ₹{productInfo.price}</p>
        </CardInfo>
      </Link>
    </CardContainer>
  );
};

export default Card;
