import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FirebaseError } from "firebase/app";
import { userRegister } from "../../utils/firebase/auth.firebase";
import { Button } from "../button/Button.styles";
import { Form, InputContainer, Small } from "./Auth.styles";
import CloseIcon from "../button/CloseIcon.component";

import useCurrentUser from "../../hooks/useAuthStateChange";

const schema = z
  .object({
    name: z.string().nonempty("Name is Required."),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Not a valid Email id."),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be greater than 6 characters.")
      .max(30, "Password must be lesser than 30 characters."),
    confirmPassword: z.string().nonempty("Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Paswords don't match.",
    path: ["confirmPassword"],
  });

export type FormDataType = z.infer<typeof schema>;

type RegisterProps = {
  isNewUser: () => void;
  isVendor: boolean;
  onRequestClose?: () => void;
};

const Register = ({ isNewUser, isVendor, onRequestClose }: RegisterProps) => {
  const currentUser = useCurrentUser();

  const { register, handleSubmit, formState, reset } = useForm<FormDataType>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const { errors, isDirty, isSubmitting } = formState;

  const onSubmitSuccess = async ({ name, email, password }: FormDataType) => {
    try {
      await userRegister(name, email, password, isVendor);
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
      <h2>Register</h2>

      <InputContainer>
        <label htmlFor="name">Name:</label>
        <div>
          <input type="text" {...register("name")} placeholder="Fullname" />
          {errors.name && <small>{errors.name.message}</small>}
        </div>
      </InputContainer>

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

      <InputContainer>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <div>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <small>{errors.confirmPassword.message}</small>
          )}
        </div>
      </InputContainer>

      <Button
        $color="primary"
        $radius="curved"
        type="submit"
        style={{ padding: "16px 8px" }}
        disabled={!isDirty || isSubmitting}
      >
        Create Account
      </Button>
      <Small>
        Already have an account.{" "}
        <a onClick={isNewUser} href="#user-login">
          Login
        </a>
      </Small>
    </Form>
  );
};

export default Register;
