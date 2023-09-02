import { FieldError } from "react-hook-form";
import { styled } from "styled-components";

export const InputContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-items: start;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: start;

    input,
    textarea {
      width: 100%;
      padding: 12px 8px;
      color: var(--on-secondary-container);
      background-color: var(--secondary-container);
      border: 1px solid var(--secondary-container);
      border-radius: var(--border-curved);

      &:hover {
        color: var(--on-surface-variant);
        background-color: var(--surface-variant);
        border: 1px solid var(--surface-variant);
      }

      &:focus,
      &:active {
        border: 1px solid tomato;
      }

      &.error {
        border: 1px solid var(--error);
      }
    }

    small {
      margin-block-start: 4px;
      color: var(--error);
    }
  }
`;

type InputProps = {
  label: string;
  type: string;
  fieldName: string;
  formRegister: any;
  placeholder: string;
  error: FieldError | undefined;
  multiple?: boolean;
  accept?: string;
};

const Input = ({
  label,
  type,
  fieldName,
  formRegister,
  placeholder,
  error,
  multiple,
  accept,
}: InputProps) => {
  return (
    <InputContainer>
      <label htmlFor={fieldName}>{label}</label>
      {type === "textarea" ? (
        <div>
          <textarea
            rows={5}
            {...formRegister}
            className={error && "error"}
            placeholder={placeholder}
          />
          {error && <small>{error.message}</small>}
        </div>
      ) : (
        <div>
          <input
            type={type}
            multiple={type === "file" && multiple}
            accept={type === "file" && accept}
            {...formRegister}
            className={error && "error"}
            placeholder={placeholder}
          />
          {error && <small>{error.message}</small>}
        </div>
      )}
    </InputContainer>
  );
};

export default Input;
