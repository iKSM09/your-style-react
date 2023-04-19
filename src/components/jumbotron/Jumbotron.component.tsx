import styled from "styled-components";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Banner = styled.div`
  height: 280px;
  background-color: lightblue;
`;

const BannerNavigator = styled.div`
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Circles = styled.span`
  width: 8px;
  height: 8px;
  background-color: #f4ccad;
  border-radius: 8px;
`;

const Jumbotron = () => {
  return (
    <div>
      <Banner>Jumbotron</Banner>
      <BannerNavigator>
        <MdChevronLeft size="20px" />
        <Circles />
        <Circles />
        <Circles />
        <Circles />
        <Circles />
        <MdChevronRight size="20px" />
      </BannerNavigator>
    </div>
  );
};

export default Jumbotron;
