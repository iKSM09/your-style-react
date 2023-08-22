import { FormEvent, ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { styled } from "styled-components";

export const SelectContainer = styled.section`
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

    select {
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

type SelectProps = {
  children: ReactNode;
  label: string;
  fieldName: string;
  selectRegister: any;
  error: FieldError | undefined;
};

const Select = ({
  children,
  label,
  fieldName,
  selectRegister,
  error,
}: SelectProps) => {
  return (
    <SelectContainer>
      <label htmlFor={fieldName}>{label}</label>
      <div>
        <select
          {...selectRegister}
          className={error && "error"}
          placeholder="select"
        >
          {children}
        </select>
        {error && <small>{error.message}</small>}
      </div>
    </SelectContainer>
  );
};

const OptGroup = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return <optgroup label={label.toUpperCase()}>{children}</optgroup>;
};

const Option = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  return <option value={value}>{children}</option>;
};

Select.OptGroup = OptGroup;
Select.Option = Option;
export default Select;
