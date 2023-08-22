import {
  ButttonVarientsProps,
  StyledIcon,
  StyledIconProps,
} from "./Button.styles";
import {
  MdAdd,
  MdArrowLeft,
  MdArrowRight,
  MdClose,
  MdDeleteOutline,
  MdFilterList,
  MdHome,
  MdMenu,
  MdMenuOpen,
  MdMoreHoriz,
  MdMoreVert,
  MdOutlineLibraryAdd,
  MdOutlineShare,
  MdOutlineShoppingCart,
  MdPerson,
  MdSearch,
  MdSettings,
  MdShare,
  MdShoppingBag,
} from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

type IconProps = {
  className?: string;
  onClick?: () => void;
  size?: string | number;
} & ButttonVarientsProps &
  StyledIconProps;

const ifGhosted = (ghosted?: boolean) => (ghosted ? 24 : 20);

const Icon = () => {
  return;
};

const Settings = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon {...varients}>
      <MdSettings size={iconSize} />
    </StyledIcon>
  );
};
Icon.Settings = Settings;

const Add = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? (varients.$ghosted ? 28 : 20);

  return (
    <StyledIcon {...varients}>
      <MdAdd size={iconSize} />
    </StyledIcon>
  );
};
Icon.Add = Add;

const AddProduct = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon {...varients}>
      <MdOutlineLibraryAdd size={iconSize} />
    </StyledIcon>
  );
};
Icon.AddProduct = AddProduct;

const Close = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? (varients.$ghosted ? 28 : 20);

  return (
    <StyledIcon {...varients}>
      <MdClose size={iconSize} />
    </StyledIcon>
  );
};
Icon.Close = Close;

const User = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="User" {...varients}>
      <MdPerson size={iconSize} />
    </StyledIcon>
  );
};
Icon.User = User;

const Cart = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon {...varients}>
      <MdOutlineShoppingCart size={iconSize} />
    </StyledIcon>
  );
};
Icon.Cart = Cart;

const Menu = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Menu" {...varients}>
      <MdMenu size={iconSize} />
    </StyledIcon>
  );
};
Icon.Menu = Menu;

const MenuOpen = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <MdMenuOpen size={iconSize} />
    </StyledIcon>
  );
};
Icon.MenuOpen = MenuOpen;

const FilterList = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <MdFilterList size={iconSize} />
    </StyledIcon>
  );
};
Icon.FilterList = FilterList;

const ShoppingBag = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <MdShoppingBag size={iconSize} />
    </StyledIcon>
  );
};
Icon.ShoppingBag = ShoppingBag;

const Heart = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <FaRegHeart size={iconSize} />
    </StyledIcon>
  );
};
Icon.Heart = Heart;

const HeartFilled = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <FaHeart size={iconSize} />
    </StyledIcon>
  );
};
Icon.HeartFilled = HeartFilled;

const Share = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <MdOutlineShare size={iconSize} />
    </StyledIcon>
  );
};
Icon.Share = Share;

const ShareFilled = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <MdShare size={iconSize} />
    </StyledIcon>
  );
};
Icon.ShareFilled = ShareFilled;

const MoreHoriz = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <MdMoreHoriz size={iconSize} />
    </StyledIcon>
  );
};
Icon.MoreHoriz = MoreHoriz;

const MoreVert = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <MdMoreVert size={iconSize} />
    </StyledIcon>
  );
};
Icon.MoreVert = MoreVert;

const Home = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <MdHome size={iconSize} />
    </StyledIcon>
  );
};
Icon.Home = Home;

const Search = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <MdSearch size={iconSize} />
    </StyledIcon>
  );
};
Icon.Search = Search;

const AddPost = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <IoMdAddCircleOutline size={iconSize} />
    </StyledIcon>
  );
};
Icon.AddPost = AddPost;

const ArrowLeft = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <MdArrowLeft size={iconSize} />
    </StyledIcon>
  );
};
Icon.ArrowLeft = ArrowLeft;

const ArrowRight = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <MdArrowRight size={iconSize} />
    </StyledIcon>
  );
};
Icon.ArrowRight = ArrowRight;

const Delete = ({ size, ...varients }: IconProps) => {
  const iconSize = size ?? ifGhosted(varients.$ghosted);

  return (
    <StyledIcon title="Opened Menu" {...varients}>
      <MdDeleteOutline size={iconSize} />
    </StyledIcon>
  );
};
Icon.Delete = Delete;

export default Icon;
