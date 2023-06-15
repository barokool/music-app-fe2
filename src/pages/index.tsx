import { useEffect, useState } from "react";
import { musics } from "../data/data";
import * as C from "../styles";
import "../App.css";
import { Musics } from "../components/musics";
import { Menu } from "../svgs/index";
import { Box, Button, Typography } from "@mui/material";
import { useAuthenticator } from "../hooks/user";
import { useLogout } from "../hooks/logout";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllTracks } from "../apis/track";
import ReactAudioPlayer from "react-audio-player";

function AppIndex() {
  const [id, setId] = useState<string>("");
  const [isFull, setIsFull] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isSidebar, setIsSidebar] = useState<boolean>(false);
  const { user } = useAuthenticator();
  const {
    data: tracks,
    error,
    isError,
    isLoading,
  } = useQuery("tracks", () => getAllTracks());
  const { logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <div className="top">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box>
          {windowWidth <= 820 ? (
            <button
              className="showSidebar"
              onClick={() => setIsSidebar(!isSidebar)}
            >
              <Menu />
            </button>
          ) : (
            ""
          )}
          <h1 className="title">
            {isFull && windowWidth <= 820 ? "" : "All songs"}
          </h1>
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          {!user ? (
            <>
              <Button variant="outlined" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="outlined" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Typography>{user.name}</Typography>
              <Button variant="outlined" onClick={() => navigate("/add-track")}>
                Add a new song
              </Button>

              <Button variant="outlined" onClick={() => logout()}>
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {(tracks?.data as any)?.map((music: { [key: string]: any }) => (
          <Musics
            key={music._id}
            img={music.coverImage}
            name={music.title}
            author={music.author.name}
            audio={music.mp3File}
            setId={setId}
            id={id}
            slug={music.slug}
          />
        ))}
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          display: "flex",
        }}
      >
        <ReactAudioPlayer src={id} autoPlay controls />
      </Box>
    </div>
  );
}

export default AppIndex;
