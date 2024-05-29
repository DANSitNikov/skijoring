export const middlewareProtectedRoutes = {
  profile: "/profile/profile",
  myDogs: "/profile/my-dogs",
  addNewDog: "/profile/my-dogs/add-new-dog",
  editDog: "/profile/my-dogs/edit-dog/:id",
};

export const middlewarePublicRoutes = {
  events: "/events",
  event: "/events/:id",
};

export const middlewareAuthRoutes = {
  signIn: "/sign-in",
  signUp: "/sign-up",
};

export const apiAuthPrefix = "/api/auth";
