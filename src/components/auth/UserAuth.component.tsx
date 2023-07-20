import {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import Register from "./Register.component";
import SignIn from "./SignIn.component";

export const Dialog = styled.dialog`
  position: fixed;
  width: 400px;
  border-radius: 8px;
  border: 1px solid rgba(136, 136, 136, 0.344);
  background-color: #fff;

  ::backdrop {
    width: 100vw;
    height: 100vh;
    background: rgb(0, 0, 0, 0.3);
  }
`;

type UserAuthProps = {
  children?: ReactNode;
  open: boolean;
  onRequestClose: () => void;
  closeOnOutsideClick: any;
};

const UserAuth = ({
  children,
  open,
  onRequestClose,
  closeOnOutsideClick,
}: UserAuthProps) => {
  const [newUser, setNewUser] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null!);

  const isNewUser = () => setNewUser((bool) => !bool);

  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (open) {
      dialogNode.showModal();
    } else {
      dialogNode.close();
    }
  }, [open]);

  function handleOutsideClick(e: MouseEvent<HTMLDialogElement>) {
    const dialogNode = dialogRef.current;

    if (closeOnOutsideClick && e.target === dialogNode) {
      onRequestClose();
    }
  }

  return (
    <Dialog
      ref={dialogRef}
      onClick={(e: MouseEvent<HTMLDialogElement>) => handleOutsideClick(e)}
    >
      {children}
      {newUser ? (
        <Register
          isNewUser={isNewUser}
          isVendor={false}
          onRequestClose={onRequestClose}
        />
      ) : (
        <SignIn isNewUser={isNewUser} onRequestClose={onRequestClose} />
      )}
    </Dialog>
  );
};

export default UserAuth;
