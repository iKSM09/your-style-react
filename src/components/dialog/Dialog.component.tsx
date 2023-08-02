import { MouseEvent, ReactNode, useEffect, useRef } from "react";
import { styled } from "styled-components";

export const DialogContainer = styled.dialog`
  position: fixed;
  width: 400px;
  border-radius: 8px;
  border: 1px solid rgba(136, 136, 136, 0.344);
  background-color: var(--surface);
  color: var(--on-surface);

  ::backdrop {
    width: 100vw;
    height: 100vh;
    background: rgb(0, 0, 0, 0.3);
  }
`;

type DialogProps = {
  children: ReactNode;
  modalState: boolean;
  closeModal: () => void;
  closeOnOutsideClick: any;
};

const Dialog = ({
  children,
  modalState,
  closeModal,
  closeOnOutsideClick,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null!);

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
      closeModal();
    }
  }

  return (
    <DialogContainer
      ref={dialogRef}
      onClick={(e: MouseEvent<HTMLDialogElement>) => handleOutsideClick(e)}
    >
      {children}
    </DialogContainer>
  );
};

export default Dialog;
