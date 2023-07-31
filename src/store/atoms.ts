import { DocumentData } from "firebase/firestore";
import { atom } from "jotai";
import { z } from "zod";

const UserSchema = z.object({
  createdAt: z.date(),
  displayName: z.string().nonempty(),
  email: z.string().nonempty().email(),
  isVendor: z.boolean(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

export const userAtom = atom<DocumentData | null>(null);
export const authModalAtom = atom(false);
export const postModalAtom = atom(false);
