import {
  Alert,
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getTrack } from "../apis/track";
import { useNavigate, useParams } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import ReactAudioPlayer from "react-audio-player";
import { getPlaylists, updateTrackToPlaylist } from "../apis/playlist";

const DetailSong = () => {
  const { id: slug } = useParams();
  const {
    data: track,
    error,
    isError,
    isLoading,
  } = useQuery(["track", slug], () => getTrack(slug));
  const { data: playlists } = useQuery("playlists", getPlaylists);
  const [success, setSuccess] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateTrackToPlaylist = async (id: string) => {
    const body = {
      slug: track?.slug,
    };
    const response = await updateTrackToPlaylist(id, body);
    console.log(response);
    if (response) setSuccess(true);
  };

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Box>
        <h1 className="title">Song detail</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2}>
          <Grid container item xs={6} direction="column">
            <Box>
              <img src={track?.coverImage || ""} alt="" width={"700px"} />
            </Box>
          </Grid>
          <Grid container item xs={6} direction="column">
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Typography sx={{ fontSize: "30px" }}>
                {track?.title} - {track?.releaseYear}
              </Typography>
              <Typography>Artist : {track?.artist}</Typography>
              <Typography>Genre : {track?.genre}</Typography>
              <ReactAudioPlayer src={track?.mp3File} controls />
              <Button
                variant="outlined"
                sx={{ width: "50%" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Add to playlist
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{ width: "50%" }}
              >
                {playlists?.data?.map((playlist: { [key: string]: any }) => {
                  const isDisabled = playlist.tracks.some(
                    (t: { slug: any }) => t?.slug === track?.slug
                  );
                  return (
                    <MenuItem
                      disabled={isDisabled}
                      onClick={() => {
                        handleUpdateTrackToPlaylist(playlist.id);
                        handleClose();
                      }}
                    >
                      {playlist.name}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Add to playlist success
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DetailSong;
