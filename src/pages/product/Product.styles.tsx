import styled from "styled-components";

export const ProductContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const ImagesSection = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
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
