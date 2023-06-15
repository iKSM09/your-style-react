import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../button/Button.styles";

import { createNewUser } from "../../utils/firebase/userAuth.firebase";

import { Form, InputContainer, Small } from "./UserAuth.styles";

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

type FormDataType = z.infer<typeof schema>;

type RegisterProps = {
  isNewUser: () => void;
  onRequestClose: () => void;
};

const Register = ({ isNewUser, onRequestClose }: RegisterProps) => {
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
    // await createUserWithEmailAndPassword(data.email, data.password);
    await createNewUser(name, email, password);
    console.log(name, email, password);
    reset();
    onRequestClose();
  };

  const onSubmitError = (errors: FieldErrors<FormDataType>) => {
    console.log(errors);
  };

  return (
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
