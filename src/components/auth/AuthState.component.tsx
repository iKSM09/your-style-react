import { useState } from "react";
import Register from "./Register.component";
import SignIn from "./SignIn.component";

type AuthStateProps = {
  isVendor?: boolean;
  onRequestClose?: () => void;
};

const AuthState = ({ isVendor = false, onRequestClose }: AuthStateProps) => {
  const [newUser, setNewUser] = useState(false);

  const isNewUser = () => setNewUser((bool) => !bool);

  return (
    <>
      {newUser ? (
        <Register
          isNewUser={isNewUser}
          isVendor={isVendor}
          onRequestClose={onRequestClose}
        />
      ) : (
        <SignIn isNewUser={isNewUser} onRequestClose={onRequestClose} />
      )}
    </>
  );
};

export default AuthState;
