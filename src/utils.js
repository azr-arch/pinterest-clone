import { getCurrentUser } from "./services/firebase";
import { redirect } from "react-router-dom";

export const requireAuth = async (request) => {
  const path = new URL(request.url).pathname;

  try {
    await getCurrentUser();
    return null;
  } catch (e) {
    throw redirect(`/?message=please log in first.&redirectTo=${path}`);
  }
};
