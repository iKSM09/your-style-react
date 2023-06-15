import styled from "styled-components";

export const Form = styled.form`
  padding: 20px 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 2px solid rgb(6, 33, 34, 0.3);
  border-radius: 6px;

  h2 {
    margin-bottom: 12px;
    color: #062122;
    text-decoration: underline;
  }
`;

export const InputContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: start;
  justify-items: start;

  label {
    text-align: start;
    margin-block: 8px;
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: start;

    input {
      padding: 12px 8px;
      border: unset;
      border-radius: 4px;
      background-color: #ebebeb;
    }

    small {
      margin-block-start: 4px;
      color: tomato;
    }
  }
`;

export const Small = styled.small`
  /* margin-top: 24px; */

  a {
    color: #f93889;
  }
`;
