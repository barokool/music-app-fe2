import * as C from "./styles";
import { Home, Search } from "../../svgs/index";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  setGenre: (e: string) => void;
  setIsSearch: (e: boolean) => void;
  setIsFull: (e: boolean) => void;
  isSearch: boolean;
  isSidebar: boolean;
  setIsSidebar: (e: boolean) => void;
};

export const Sidebar = ({
  setGenre,
  setIsSearch,
  setIsFull,
  isSearch,
  isSidebar,
  setIsSidebar,
}: Props) => {
  const navigate = useNavigate();

  return (
    <C.Container isSidebar={isSidebar}>
      <div className="inicialSearch ">
        <div
          onClick={() => (
            setGenre(""),
            setIsSearch(false),
            setIsFull(false),
            setIsSidebar(false),
            navigate("/")
          )}
          className="iniSearDivs"
        >
          <p>
            <Home />
          </p>{" "}
          Home Page
        </div>

        <div
          onClick={() => (setIsSearch(!isSearch), setIsSidebar(false))}
          className="iniSearDivs"
        >
          <p>
            <Search />
          </p>{" "}
          Search
        </div>
      </div>

      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box>
          <Button onClick={() => navigate("/add-playlist")} variant="outlined">
            Add Playlists
          </Button>
        </Box>
        <Box>
          <Button onClick={() => navigate("/playlists")} variant="outlined">
            Playlists
          </Button>
        </Box>
        <Box>
          <Button onClick={() => navigate("/add-track")} variant="outlined">
            Add Track
          </Button>
        </Box>
      </Box>

      {/* <div className="genres">
        <h2>Genres</h2>
        <div
          onClick={() => (
            setGenre("Beats"), setIsSidebar(false), setIsSearch(false)
          )}
        >
          Beats
        </div>
        <div
          onClick={() => (
            setGenre("Ambient"), setIsSidebar(false), setIsSearch(false)
          )}
        >
          Ambient
        </div>
        <div
          onClick={() => (
            setGenre("Classic"), setIsSidebar(false), setIsSearch(false)
          )}
        >
          Classic
        </div>
        <div
          onClick={() => (
            setGenre("Eletronic"), setIsSidebar(false), setIsSearch(false)
          )}
        >
          Eletronic
        </div>
      </div> */}
    </C.Container>
  );
};
