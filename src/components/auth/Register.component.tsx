import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FirebaseError } from "firebase/app";
import { userRegister } from "../../utils/firebase/auth.firebase";

import useCurrentUser from "../../hooks/useAuthStateChange";
import Input from "../_ui/form/Input.component";
import Form from "../_ui/form/Form.component";
import Icon from "../_ui/button/Icon.components";
import { Button } from "../_ui/button/Button.styles";
import { NewUser, NewUserType } from "../../context/atoms";

type RegisterProps = {
  isNewUser: () => void;
  isVendor: boolean;
  onRequestClose?: () => void;
};

const Register = ({ isNewUser, isVendor, onRequestClose }: RegisterProps) => {
  const currentUser = useCurrentUser();

  const { register, handleSubmit, formState, reset } = useForm<NewUserType>({
    mode: "onBlur",
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(NewUser),
  });

  const { errors, isDirty, isSubmitting } = formState;

  const onSubmitSuccess = async ({
    displayName,
    email,
    password,
  }: NewUserType) => {
    try {
      await userRegister(displayName, email, password, isVendor);
      reset();
      onRequestClose?.();
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use")
          return alert("Cannot create user, email is already in use.");
      }
      console.error("user creation encountered an error", error);
    }
  };

  const onSubmitError = (errors: FieldErrors<NewUserType>) => {
    console.error(errors);
  };

  return currentUser ? (
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>Welcome {currentUser.displayName}</p>
      <Icon.Close $curved onClick={onRequestClose} />
    </section>
  ) : (
    <Form
      formTitle="Register"
      onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}
    >
      <Input
        label="Name:"
        type="text"
        fieldName="displayName"
        formRegister={register("displayName")}
        placeholder="Fullname"
        error={errors.displayName}
      />

      <Input
        label="Email:"
        type="email"
        fieldName="email"
        formRegister={register("email")}
        placeholder="Email"
        error={errors.email}
      />

      <Input
        label="Password:"
        type="password"
        fieldName="password"
        formRegister={register("password")}
        placeholder="Password"
        error={errors.password}
      />

      <Input
        label="Confirm Password:"
        type="password"
        fieldName="confirmPassword"
        formRegister={register("confirmPassword")}
        placeholder="Confirm Password"
        error={errors.confirmPassword}
      />

      <Button
        $curved
        type="submit"
        style={{ padding: "16px 8px" }}
        disabled={!isDirty || isSubmitting}
      >
        Create Account
      </Button>

      <Form.Footer>
        Already have an account.{" "}
        <a onClick={isNewUser} href="#user-login">
          Login
        </a>
      </Form.Footer>
    </Form>
  );
};

export default Register;
