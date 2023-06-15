import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuthenticator } from "./user";
import { useCookies } from "react-cookie";

export const useLogout = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { setUser } = useAuthenticator();
  const [cookie, setcookie, removeCookie] = useCookies(["access_token"]);

  const logout = () => {
    removeCookie("access_token");
    setUser(null);
    navigate("/");
  };

  return { logout };
};
