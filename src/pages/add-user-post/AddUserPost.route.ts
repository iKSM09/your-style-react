import { Route } from "@tanstack/router";
import { userRoute } from "../user/User.route";
import AddUserPost from "./AddUserPost.page";

export const addPostRoute = new Route({
  getParentRoute: () => userRoute,
  path: "/add-post",
});

export const addPostIndexRoute = new Route({
  getParentRoute: () => addPostRoute,
  path: "/",
  component: AddUserPost,
});
