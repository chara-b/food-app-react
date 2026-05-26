import config from "../config.ts";
import type { User } from "../shared/types/types.ts";

export async function fetchUser(email: string): Promise<User> {
  try {
    const res = await fetch(`${config.USERS_URL}?email=${email}`);

    if (!res.ok) {
      throw new Error("Something went wrong while fetching user data");
    }
    const user = await res.json();
    return user[0];
  } catch (err) {
    throw new Error(err.message);
  }
}
