import { ReactNode } from "react";
import { useAtom } from "jotai";

import Dialog from "../dialog/Dialog.component";
import AuthState from "./AuthState.component";

import { authModalAtom } from "../../context/atoms";

type UserAuthProps = {
  children?: ReactNode;
  closeOnOutsideClick: any;
};

const AuthStateDialog = ({ children, closeOnOutsideClick }: UserAuthProps) => {
  const [modalState, setModalState] = useAtom(authModalAtom);

  return (
    <Dialog
      modalState={modalState}
      closeModal={() => setModalState(false)}
      closeOnOutsideClick={closeOnOutsideClick}
    >
      {children}
      <AuthState onRequestClose={() => setModalState(false)} />
    </Dialog>
  );
};

export default AuthStateDialog;
