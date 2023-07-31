import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Register from "./Register.component";
import SignIn from "./SignIn.component";
import { authModalAtom } from "../../store/atoms";
import { useAtom } from "jotai";

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
  closeOnOutsideClick: any;
};

const UserAuth = ({ children, closeOnOutsideClick }: UserAuthProps) => {
  const [newUser, setNewUser] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null!);
  const [modalState, toggleModalState] = useAtom(authModalAtom);

  const isNewUser = () => setNewUser((bool) => !bool);

  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (modalState) {
      dialogNode.showModal();
    } else {
      dialogNode.close();
    }
  }, [modalState]);

  function handleOutsideClick(e: MouseEvent<HTMLDialogElement>) {
    const dialogNode = dialogRef.current;

    if (closeOnOutsideClick && e.target === dialogNode) {
      toggleModalState(false);
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
          onRequestClose={() => toggleModalState(false)}
        />
      ) : (
        <SignIn
          isNewUser={isNewUser}
          onRequestClose={() => toggleModalState(false)}
        />
      )}
    </Dialog>
  );
};

export default UserAuth;
