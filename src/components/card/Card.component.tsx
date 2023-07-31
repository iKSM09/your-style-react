import { Link } from "@tanstack/router";

import { productRoute } from "../../pages/product/Product.page";
import { CardContainer, CardInfo, Image, ImageContainer } from "./Card.styles";
import { ProductDataTypes } from "../../store/products.store";

type CardProps = {
  productInfo: ProductDataTypes;
};

const Card = ({ productInfo }: CardProps) => {
  const previewsImage = productInfo?.colors?.[0]?.images[0];
  // const category = productInfo.category.split("/")[0];

  return (
    <CardContainer>
      <Link
        from={productRoute.id}
        to="/store/$for/$productId"
        params={{
          for: productInfo?.category?.split("/")[0],
          productId: productInfo.id,
        }}
        // search={productInfo}
        activeOptions={{ exact: true }}
      >
        <ImageContainer>
          <Image src={previewsImage} alt={`${productInfo.name} preview`} />
        </ImageContainer>
        <CardInfo>
          <p className="title">{`${productInfo.name.slice(0, 18)}...`}</p>
          <p>₹{productInfo.price}</p>
        </CardInfo>
      </Link>
    </CardContainer>
  );
};

export default Card;
