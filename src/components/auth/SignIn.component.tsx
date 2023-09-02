import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userSignIn } from "../../utils/firebase/auth.firebase";

import useCurrentUser from "../../hooks/useAuthStateChange";
import { MdClose, MdLogin } from "react-icons/md";
import Input from "../_ui/form/Input.component";
import Form from "../_ui/form/Form.component";
import { Button, IconButton } from "../_ui/button/Button.styles";
import { ExistingUser, ExistingUserType } from "../../context/atoms";

type RegisterProps = {
  isNewUser: () => void;
  onRequestClose?: () => void;
};

const SignIn = ({ isNewUser, onRequestClose }: RegisterProps) => {
  const currentUser = useCurrentUser();

  const { register, handleSubmit, formState, reset } =
    useForm<ExistingUserType>({
      mode: "onBlur",
      defaultValues: {
        email: "",
        password: "",
      },
      resolver: zodResolver(ExistingUser),
    });

  const { errors, isDirty, isSubmitting } = formState;

  const onSubmitSuccess = async (data: ExistingUserType) => {
    try {
      await userSignIn(data.email, data.password);
      reset();
      onRequestClose?.();
    } catch (error) {
      console.error({ error });
    }
  };

  const onSubmitError = (errors: FieldErrors<ExistingUserType>) => {
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
      <span onClick={onRequestClose}>
        <Button $curved>
          <MdClose size={24} />
        </Button>
      </span>
    </section>
  ) : (
    <Form
      formTitle="Login"
      onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}
    >
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

      <IconButton
        $curved
        type="submit"
        style={{ padding: "16px 8px" }}
        disabled={!isDirty || isSubmitting}
      >
        <MdLogin size={18} />
        Login
      </IconButton>

      <Form.Footer>
        Don't have an account.{" "}
        <a onClick={isNewUser} href="#user-register">
          Register
        </a>
      </Form.Footer>
    </Form>
  );
};

export default SignIn;
