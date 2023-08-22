import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { userSignIn } from "../../utils/firebase/auth.firebase";

import useCurrentUser from "../../hooks/useAuthStateChange";
import { MdClose, MdLogin } from "react-icons/md";
import Input from "../_ui/form/Input.component";
import Form from "../_ui/form/Form.component";
import { Button, IconButton } from "../_ui/button/Button.styles";

const schema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Not a valid Email id."),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be greater than 6 characters.")
    .max(30, "Password must be lesser than 30 characters."),
});

type FormDataType = z.infer<typeof schema>;

type RegisterProps = {
  isNewUser: () => void;
  onRequestClose?: () => void;
};

const SignIn = ({ isNewUser, onRequestClose }: RegisterProps) => {
  const currentUser = useCurrentUser();

  const { register, handleSubmit, formState, reset } = useForm<FormDataType>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const { errors, isDirty, isSubmitting } = formState;

  const onSubmitSuccess = async (data: FormDataType) => {
    try {
      const { user } = await userSignIn(data.email, data.password);
      reset();
      onRequestClose?.();
    } catch (error) {
      console.error({ error });
    }
  };

  const onSubmitError = (errors: FieldErrors<FormDataType>) => {
    console.log(errors);
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
