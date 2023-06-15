import { useEffect, useState } from "react";
import { musics } from "../data/data";
import * as C from "../styles";
import { Player } from "../components/player";
import "../App.css";
import { Musics } from "../components/musics";
import { Sidebar } from "../components/sidebar";
import { Menu } from "../svgs/index";
import { Box, Button, Typography } from "@mui/material";
import { useAuthenticator } from "../hooks/user";
import { useLogout } from "../hooks/logout";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useCookies } from "react-cookie";

function GeneralIndex() {
  const [id, setId] = useState<string>("");
  const [isFull, setIsFull] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [genre, setGenre] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isSidebar, setIsSidebar] = useState<boolean>(false);
  const { user } = useAuthenticator();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <div>
      <C.Container>
        <Sidebar
          setGenre={setGenre}
          setIsSearch={setIsSearch}
          setIsFull={setIsFull}
          isSearch={isSearch}
          isSidebar={isSidebar}
          setIsSidebar={setIsSidebar}
        />
        <Outlet />
      </C.Container>
    </div>
  );
}

export default GeneralIndex;
