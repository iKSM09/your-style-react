import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../button/Button.styles";

import { Form, InputContainer, Small } from "./Auth.styles";
import { userSignIn } from "../../utils/firebase/auth.firebase";

import useCurrentUser from "../../hooks/useAuthStateChange";
import CloseIcon from "../button/CloseIcon.component";

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
        <CloseIcon />
      </span>
    </section>
  ) : (
    <Form onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}>
      <h2>Login</h2>

      <InputContainer>
        <label htmlFor="email">Email:</label>
        <div>
          <input type="email" {...register("email")} placeholder="Email" />
          {errors.email && <small>{errors.email.message}</small>}
        </div>
      </InputContainer>

      <InputContainer>
        <label htmlFor="password">Password:</label>
        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && <small>{errors.password.message}</small>}
        </div>
      </InputContainer>

      <Button
        $color="primary"
        $radius="curved"
        type="submit"
        style={{ padding: "16px 8px" }}
        disabled={!isDirty || isSubmitting}
      >
        Login
      </Button>
      <Small>
        Don't have an account.{" "}
        <a onClick={isNewUser} href="#user-register">
          Register
        </a>
      </Small>
    </Form>
  );
};

export default SignIn;
