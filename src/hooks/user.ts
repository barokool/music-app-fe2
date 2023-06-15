import { useLocalStorage } from "usehooks-ts";
import { User } from "../interfaces/user";

export const useAuthenticator = () => {
  const [user, setUser] = useLocalStorage<User>("user", null);

  return {
    user,
    setUser,
  };
};
