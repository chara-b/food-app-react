import { USERS_URL } from "../constants/urls";

export async function fetchUser({ email }) {
  try {
    const res = await fetch(`${USERS_URL}?email=${email}`);

    if (!res.ok) {
      throw new Error("Something went wrong while fetching user data");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
