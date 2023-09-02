import { DocumentData } from "firebase/firestore";
import { atom } from "jotai";
import { z } from "zod";

const UserSchema = z.object({
  createdAt: z.date(),
  photoURL: z.string(),
  displayName: z.string().nonempty("Name is required."),
  username: z.string().nonempty("Username is required."),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Not a valid Email id."),
  bio: z
    .string()
    .max(160, "Bio must be lesser than 160 characters.")
    .optional(),
  isVendor: z.boolean(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be greater than 6 characters.")
    .max(30, "Password must be lesser than 30 characters."),
  confirmPassword: z.string().nonempty("Password is required."),
});

export const NewUser = UserSchema.pick({
  displayName: true,
  email: true,
  password: true,
  confirmPassword: true,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Paswords don't match.",
  path: ["confirmPassword"],
});

export const ExistingUser = UserSchema.pick({
  email: true,
  password: true,
});

export const EditProfile = UserSchema.pick({
  photoURL: true,
  displayName: true,
  username: true,
  bio: true,
});

export type UserSchemaType = z.infer<typeof UserSchema>;
export type NewUserType = z.infer<typeof NewUser>;
export type ExistingUserType = z.infer<typeof ExistingUser>;
export type EditProfileType = z.infer<typeof EditProfile>;

export const userAtom = atom<DocumentData | null>(null);
export const newUserAtom = atom(false);
export const modalAtom = atom(false);
export const authModalAtom = atom(false);
export const postModalAtom = atom(false);
