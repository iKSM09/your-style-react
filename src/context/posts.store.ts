import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";
import { getCollectionDocsFor } from "../utils/firebase/db.firebase";
import { z } from "zod";

export const userPostSchema = z.object({
  id: z.string().uuid().nonempty("ID is required."),
  postedBy: z
    .string()
    .nonempty("Email is required.")
    .email("Not a valid Email id."),
  postDate: z.date(),
  image: z.string().nonempty("Please provise an image."),
  caption: z.string().max(400, "Description should be lesser than 400 words."),
  productLink: z.string().nonempty("Please provide a product link."),
});

export type UserPostTypes = z.infer<typeof userPostSchema>;

type State = {
  allPosts: UserPostTypes[];
};

type Action = {
  setPosts: () => void;
};

type PersistTypes = (
  config: StateCreator<State & Action>,
  options: PersistOptions<State & Action>
) => StateCreator<State & Action>;

export const postsStore = create<State & Action>(
  (persist as PersistTypes)(
    (set) => ({
      allPosts: [],

      setPosts: async () =>
        set({
          allPosts: (await getCollectionDocsFor("posts")) as UserPostTypes[],
        }),
    }),
    {
      name: "post-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
