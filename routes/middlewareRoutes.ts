export const middlewareAdminRoutes = {
  createEvent: "/events/create-event",
  editEvent: "/events/:id/edit-event",
};

export const middlewareProtectedRoutes = {
  profile: "/profile/profile",
  myDogs: "/profile/my-dogs",
  addNewDog: "/profile/my-dogs/add-new-dog",
  editDog: "/profile/my-dogs/edit-dog/:id",
  eventRegistration: "/events/:id/registration",
  myEvents: "/my-events",
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
