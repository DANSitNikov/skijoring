export const protectedRoutes = {
  profile: "/profile/profile",
  myDogs: "/profile/my-dogs",
  addNewDog: "/profile/my-dogs/add-new-dog",
  editDog: (dogId: string) => `/profile/my-dogs/edit-dog/${dogId}`,
};

export const publicRoutes = {
  events: "/events",
  event: (eventId: string) => `/events/${eventId}`,
};

export const authRoutes = {
  signIn: "/sign-in",
  signUp: "/sign-up",
};

export const apiAuthPrefix = "/api/auth";

export const evenConst = "/events/:id";
