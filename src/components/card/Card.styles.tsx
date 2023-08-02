import styled from "styled-components";

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 12px;
`;

export const ImageContainer = styled.div`
  /* width: 240px;
  height: 312px; */
  aspect-ratio: 2 / 3;
  background-color: lightgoldenrodyellow;
  border-radius: 12px;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* transition: all 0.5s ease; */
`;

export const CardInfo = styled.div`
  margin-block: 1rem;
  padding-inline: 4px;
  display: flex;
  justify-content: space-between;

  p + p {
    margin: 0;
  }

  .title {
    font-weight: 500;
  }
`;
