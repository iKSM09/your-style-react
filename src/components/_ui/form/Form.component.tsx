import { ReactNode } from "react";
import { styled } from "styled-components";

export const FormContainer = styled.form`
  margin: 1rem auto;
  width: min(calc(100vw - 1rem), calc(425px - 1rem));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border: 2px solid rgb(6, 33, 34, 0.3);
  border-radius: 6px;

  h2 {
    margin-bottom: 12px;
    color: var(--on-bg);
    text-decoration: underline;
  }

  small {
    a {
      color: #f93889;
    }
  }
`;

type FormProps = {
  formTitle: string;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  children: ReactNode;
};

const Footer = ({ children }: { children: ReactNode }) => (
  <small>{children}</small>
);

const Form = ({ formTitle, onSubmit, children }: FormProps) => {
  return (
    <FormContainer onSubmit={onSubmit}>
      <h2>{formTitle}</h2>
      {children}
    </FormContainer>
  );
};

Form.Footer = Footer;
export default Form;
