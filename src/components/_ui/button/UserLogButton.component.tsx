import { useSetAtom } from "jotai";
import { MdLogin, MdLogout } from "react-icons/md";

import { IconButton } from "./Button.styles";
import useCurrentUser from "../../../hooks/useAuthStateChange";
import { authModalAtom } from "../../../store/atoms";
import { userSignOut } from "../../../utils/firebase/auth.firebase";

type UserLogButtonProps = {
  cssClass?: string;
};

const UserLogButton = ({ cssClass }: UserLogButtonProps) => {
  const currentUser = useCurrentUser();
  const toggleModalState = useSetAtom(authModalAtom);

  return (
    <>
      {currentUser ? (
        <IconButton
          $secondary
          $outlined
          $curved
          className={cssClass}
          onClick={userSignOut}
        >
          <MdLogout size={18} />
          Logout
        </IconButton>
      ) : (
        <IconButton
          $curved
          className={cssClass}
          onClick={() => toggleModalState((bool) => !bool)}
        >
          <MdLogin size={18} />
          Login
        </IconButton>
      )}
    </>
  );
};

export default UserLogButton;
