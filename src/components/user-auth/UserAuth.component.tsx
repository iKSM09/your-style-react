import { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Register from "./Register.component";
import { Button } from "../button/Button.styles";
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
  // const lastActiveElement = useRef<HTMLElement>(null!);

  const isNewUser = () => setNewUser((bool) => !bool);

  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (open) {
      // lastActiveElement.current = document.activeElement as HTMLElement;
      dialogNode.showModal();
    } else {
      dialogNode.close();
      // lastActiveElement.current.focus();
    }
  }, [open]);

  function handleOutsideClick(e: MouseEvent) {
    const dialogNode = dialogRef.current;
    if (closeOnOutsideClick && e.target === dialogNode) {
      onRequestClose();
    }
  }

  return (
    <Dialog ref={dialogRef} onClick={handleOutsideClick}>
      {/* <h1>This is a modal...</h1> */}
      {children}
      {newUser ? (
        <Register isNewUser={isNewUser} onRequestClose={onRequestClose} />
      ) : (
        <SignIn isNewUser={isNewUser} onRequestClose={onRequestClose} />
      )}
      {/* <Button $color="primary" $radius="curved" onClick={onRequestClose}>
        Create Account
      </Button> */}
    </Dialog>
  );
};

export default UserAuth;
