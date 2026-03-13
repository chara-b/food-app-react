import { USERS_URL } from "../constants/urls";

export async function fetchUser(email) {
  try {
    const res = await fetch(`${USERS_URL}?email=${email}`);

    if (!res.ok) {
      throw new Error("Something went wrong while fetching user data");
    }
    const user = await res.json();
    return user[0];
  } catch (err) {
    throw new Error(err.message);
  }
}
