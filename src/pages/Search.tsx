import React from "react";
import { Box, Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "react-query";
import { getAllTracks } from "../apis/track";
import * as C from "../styles";
import { Musics } from "../components/musics";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const { data, isLoading } = useQuery(["tracksFound", searchTerm], () =>
    getAllTracks(searchTerm)
  );

  console.log(data?.data);

  return (
    <div className="">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          flexDirection: "column",
        }}
      >
        {/* <Container sx={{ mt: 5 }}> */}
        <h1>Search</h1>
        <TextField
          id="search"
          type="search"
          label="Search"
          value={searchTerm}
          onChange={handleChange}
          sx={{ width: 600 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ marginTop: "50px" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {(data?.data as any)?.map((music: { [key: string]: any }) => (
              <Musics
                key={music._id}
                img={music.coverImage}
                name={music.title}
                author={music.author.name}
                audio={music.mp3File}
                slug={music.slug}
              />
            ))}
          </Box>
        </Box>
        {/* </Container> */}
      </Box>
    </div>
  );
};

export default Search;
