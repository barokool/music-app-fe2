import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { createPlaylist } from "../apis/playlist";
import { useNavigate } from "react-router-dom";

type FormValues = WarningProps;

type WarningProps = {
  name: string;
};

const validation = yup
  .object({
    name: yup.string(),
  })
  .required();

const AddPlaylist = () => {
  const formMethods = useForm<FormValues>({
    defaultValues: {},
    mode: "onBlur",
    resolver: yupResolver(validation),
  });
  const { handleSubmit, register, watch, setValue } = formMethods;
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await createPlaylist(data);
      if (response) {
        setSuccess(true);
        navigate("/playlists");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "100px",
        marginTop: "100px",
      }}
    >
      <h1>Add Playlist</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={300}
          margin="0 auto"
        >
          <TextField
            type="text"
            label="Name"
            margin="normal"
            {...register("name")}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Create
          </Button>
        </Box>
      </form>
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
          Create success
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddPlaylist;
