import styled from "styled-components";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import JumbotronBanner from "../../assets/banner-placeholder.png";

export const Banner = styled.div`
  margin-bottom: 12px;
  height: 280px;
  background-color: lightblue;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const BannerNavigator = styled.div`
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const Circles = styled.span`
  width: 8px;
  height: 8px;
  background-color: #f4ccad;
  border-radius: 8px;
`;

const Jumbotron = () => {
  return (
    <div>
      <Banner>
        <img src={JumbotronBanner} alt="banner" />
      </Banner>
      {/* <BannerNavigator>
        <MdChevronLeft size="20px" />
        <Circles />
        <Circles />
        <Circles />
        <Circles />
        <Circles />
        <MdChevronRight size="20px" />
      </BannerNavigator> */}
    </div>
  );
};

export default Jumbotron;
