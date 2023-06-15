import React, { useState } from "react";
import { useQuery } from "react-query";
import { getPlaylists } from "../apis/playlist";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ReactAudioPlayer from "react-audio-player";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Playlists = () => {
  const { data, error, isError, isLoading } = useQuery(
    "playlists",
    getPlaylists
  );

  const [expanded, setExpanded] = React.useState<string | false>(
    data?.data?.[0].id || ""
  );
  const [url, setUrl] = useState("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const onRemoveSongOfPlaylist = () => {};

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Box>
        <h1 className="title">My playlist</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // alignItems: "center",
          padding: "20px",
          flexDirection: "column",
        }}
      >
        <div>
          {data?.data?.map((playlist: any) => {
            return (
              <Accordion
                expanded={expanded === playlist?.id}
                onChange={() => {
                  handleChange(playlist?.id);
                }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography> {playlist.name}</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                  {playlist?.tracks?.map((track: any) => {
                    return (
                      <Box
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onClick={() => setUrl(track.mp3File)}
                      >
                        <Typography>Name song : {track?.title}</Typography>
                        <Button variant="outlined" color="error">
                          Delete of playlist
                        </Button>
                      </Box>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </Box>
      <Box sx={{ position: "fixed", bottom: 0 }}>
        <ReactAudioPlayer src={url} controls />
      </Box>
    </Box>
  );
};

export default Playlists;
