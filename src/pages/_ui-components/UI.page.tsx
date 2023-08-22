import { styled } from "styled-components";

import { Divider } from "../product/Product.styles";

import { MdAdd, MdCheck, MdClose } from "react-icons/md";
import Input from "../../components/_ui/form/Input.component";
import {
  Button,
  ButtonSet,
  IconButton,
} from "../../components/_ui/button/Button.styles";
import Icon from "../../components/_ui/button/Icon.components";
import Select from "../../components/_ui/form/Select.component";

const Flex = styled.div`
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const FlexCol = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
`;

const UI = () => {
  return (
    <>
      <Flex title="Buttons">
        <h2>Buttons</h2>
        <Button>Primary</Button>
        <IconButton>
          <MdAdd size={18} className="icon" />
          Icon Button
        </IconButton>
        <Button $secondary>Secondary</Button>
        <Button $outlined $curved>
          Outlined
        </Button>
        <IconButton $secondary $outlined $pilled $reversed>
          Outlined Icon
          <MdClose size={16} />
        </IconButton>
        <Button $curved>Curved Button</Button>
        <Button $secondary $pilled>
          Pill Button
        </Button>
        <Button disabled>Disabled Button</Button>
        <Icon.Add $pilled />
        <Icon.AddProduct $outlined $curved />
        <Icon.Close $ghosted />
        <Icon.Settings $curved />
        <Icon.MoreHoriz $secondary $pilled $ghosted />
        <Icon.MoreVert $secondary $pilled $ghosted />
        <Icon.User />
        <Icon.Cart $outlined $pilled />
        <Icon.Heart $ghosted $highlight />
        <Icon.HeartFilled $ghosted $highlight />
        <Icon.Share $secondary $ghosted $highlight size={28} />
        <Icon.ShareFilled $secondary $ghosted $highlight size={28} />
        <Icon.ShoppingBag $outlined $curved />
        <Icon.FilterList $ghosted $highlight size={28} />
        <Icon.ArrowLeft $secondary $pilled size={28} />
        <Icon.ArrowRight $secondary $pilled size={28} />
        <ButtonSet $pilled>
          <IconButton>
            <MdCheck />
            Selected
          </IconButton>
          <Button>TAB 02</Button>
          <Button>TAB 03</Button>
        </ButtonSet>
      </Flex>
      <Divider />
      <FlexCol>
        <h2>Inputs</h2>
        <Input
          label="Name:"
          type="text"
          fieldName="name"
          formRegister=""
          placeholder="Fullname"
          error={undefined}
        />
        <Input
          label="Confirm Password:"
          type="password"
          fieldName="password"
          formRegister=""
          placeholder="password"
          error={undefined}
        />
        <Input
          label="Files:"
          type="file"
          fieldName="file"
          formRegister=""
          placeholder=""
          error={undefined}
        />
        {/* <Select>
          Select
        </Select> */}
      </FlexCol>
    </>
  );
};

export default UI;
