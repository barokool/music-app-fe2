import { Box, Button } from "@mui/material";
import * as C from "./styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  img?: string;
  name?: string;
  author?: string;
  audio?: string;
  id?: string;
  slug?: string;
  setId?: (e: string) => void;
};

export const Musics = ({ img, name, author, audio, slug, setId }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <C.Container>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          margin: "0 20px",
        }}
        className="divGenre"
      >
        <Box sx={{ position: "absolute", top: "10px", right: "0px" }}>
          <Button
            sx={{}}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon sx={{ color: "black" }} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Add to Playlist</MenuItem>
          </Menu>
        </Box>
        <Box
          onClick={() => navigate(`/song/${slug}`)}
          sx={{ cursor: "pointer" }}
        >
          <img src={img} width={"300px"} alt="" />
          <h1>Name: {name}</h1>
          <h3>Author: {author}</h3>
          <audio src={audio} />
        </Box>
        <Button
          onClick={() => setId(audio)}
          variant="contained"
          color="primary"
          size="large"
        >
          Play
        </Button>
      </Box>
    </C.Container>
  );
};
