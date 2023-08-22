import styled from "styled-components";
import { deviceWidth } from "../../styles/devices.breakpoints";

export const ProductContainer = styled.section`
  width: 100vw;
  overflow-x: hidden;

  @media screen and (${deviceWidth.approxLaptop}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

export const ImagesSection = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;

  @media screen and (${deviceWidth.approxLaptop}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
`;

export const Image = styled.img`
  max-width: 100%;
`;

export const DetailsSection = styled.div`
  padding: 1rem;
  text-align: start;
`;

export const Divider = styled.hr`
  margin-block: 0.5rem;
  opacity: 0.3;
`;

export const ProductSizeButton = styled.button<{ $selected: boolean }>`
  min-width: 48px;
  height: 48px;
  padding: 8px 12px;
  font-size: 14px;
  background-color: ${({ $selected = false }) =>
    $selected ? "var(--on-primary)" : "transparent"};
  border: 1px solid white;
  text-align: center;

  &:hover {
    background-color: var(--on-secondary);
  }
`;

export const ImageGallery = styled.section`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  padding: 20px 20px 50px;
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  grid-auto-flow: dense;
  gap: 8px;

  @media screen and (${deviceWidth.gteTablet}) {
    gap: minmax(1rem, 2rem);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
  background-color: #d7d7d8;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;
