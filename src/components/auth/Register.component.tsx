import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FirebaseError } from "firebase/app";
import { userRegister } from "../../utils/firebase/auth.firebase";

import useCurrentUser from "../../hooks/useAuthStateChange";
import Input from "../_ui/form/Input.component";
import Form from "../_ui/form/Form.component";
import Icon from "../_ui/button/Icon.components";
import { Button } from "../_ui/button/Button.styles";

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
        fieldName="name"
        formRegister={register("name")}
        placeholder="Fullname"
        error={errors.name}
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
