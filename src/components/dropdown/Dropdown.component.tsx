import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import {
  DropdownButton,
  DropdownContainer,
  DropdownOptionBoxArrow,
  DropdownOptionButton,
  DropdownOptions,
  DropdownOptionsBox,
  UnstyledButton,
} from "./Dropdown.styles";

type DropdownProps = {
  defaultOption: string;
  options: string[];
  additional?: string;
  title: string;
};

const Dropdown = ({
  defaultOption,
  options,
  additional = "",
  title,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultOption);

  const handleSelected = (option: string) => {
    setSelected(option);
    setOpen(false);
  };

  const handleState = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* <label htmlFor={title}>{title}</label> */}
      <select name={additional + title} id={title}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;

// <DropdownContainer title={title}>
//   <DropdownButton>
//     <UnstyledButton onClick={handleState}>
//       {additional + selected}
//     </UnstyledButton>
//     {open ? <MdExpandLess size="1rem" /> : <MdExpandMore size="1rem" />}
//   </DropdownButton>
//   {open ? (
//     <DropdownOptionsBox>
//       <DropdownOptionBoxArrow />
//       <DropdownOptions>
//         {options.map((option, index) => (
//           <li key={index}>
//             <DropdownOptionButton onClick={() => handleSelected(option)}>
//               {option}
//             </DropdownOptionButton>
//           </li>
//         ))}
//       </DropdownOptions>
//     </DropdownOptionsBox>
//   ) : null}
// </DropdownContainer>
