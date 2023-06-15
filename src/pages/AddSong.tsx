import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Select,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../apis";
import { SimpleConsoleLogger } from "typeorm";
import { createTrack } from "../apis/track";
// import { api } from "../apis";

type FormValues = WarningProps;

type WarningProps = {
  title: string;
  coverImage: string; // file
  artist: string;
  album: string;
  genre: string;
  releaseYear: string;
  duration: string;
  mp3File: string; // file
};

const validation = yup
  .object({
    title: yup.string(),
    coverImage: yup.string(),
    artist: yup.string(),
    album: yup.string(),
    genre: yup.string(),
    releaseYear: yup.string(),
    duration: yup.string(),
    mp3File: yup.string(),
  })
  .required();

const AddSong = () => {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      title: "",
      coverImage: "",
      artist: "",
      album: "",
      genre: "",
      releaseYear: "",
      duration: "",
      mp3File: "",
    },
    mode: "onBlur",
    resolver: yupResolver(validation),
  });
  const navigate = useNavigate();
  const [imageResponse, setImageResponse] = useState(null);
  const [fileResponse, setFileResponse] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const { handleSubmit, register, watch, setValue } = formMethods;
  const [success, setSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const response = await api.post("tracks/uploaded", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response && response.data?.url) {
      setValue("coverImage", response.data?.url);
      setImageResponse(true);
    }
  };

  const handleAudioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingAudio(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const response = await api.post("tracks/uploaded", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data.url);

    if (response && response.data?.url) {
      setValue("mp3File", response.data?.url);
      setFileResponse(true);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const body = {
        ...data,
        releaseYear: parseInt(data.releaseYear),
        duration: parseInt(data.duration),
      };
      const response = await createTrack(body);

      if (response) {
        setSuccess(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fileResponse) {
      setLoadingAudio(false);
    }
  }, [fileResponse]);

  useEffect(() => {
    if (imageResponse) {
      setLoadingImage(false);
    }
  }, [imageResponse]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginLeft: "100px",
      }}
    >
      <h1>Add new song</h1>

      <Box sx={{ paddingTop: "50px" }}>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  maxWidth: "700px",
                  justifyContent: "center",
                }}
              >
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  xs={12}
                >
                  <Grid item xs={6}>
                    <Typography>Name</Typography>
                    <TextField
                      type="text"
                      label="Name"
                      margin="normal"
                      {...register("title")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Album</Typography>
                    <TextField
                      type="text"
                      label="Album"
                      margin="normal"
                      {...register("album")}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>Artist</Typography>
                    <TextField
                      type="text"
                      label="Artist"
                      margin="normal"
                      {...register("artist")}
                    />
                  </Grid>
                  {loadingImage ? (
                    <>
                      <Typography>Loading image...</Typography>
                      <CircularProgress />
                    </>
                  ) : !loadingImage && watch("coverImage") ? (
                    <img src={watch("coverImage")} width={240} alt="" />
                  ) : (
                    <Grid item xs={6}>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="raised-button-file">
                        <Button component="span">Upload cover image</Button>
                      </label>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Typography>Genre</Typography>
                  <TextField
                    type="text"
                    label="Genre"
                    margin="normal"
                    {...register("genre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography>Release year</Typography>
                  <TextField
                    type="text"
                    label="Year"
                    margin="normal"
                    {...register("releaseYear")}
                  />
                  {/* <Select
                    onChange={(value) =>
                      setValue("releaseYear", value as unknown as string)
                    }
                  /> */}
                </Grid>

                <Grid item xs={6}>
                  <Typography>Duration</Typography>
                  <TextField
                    type="text"
                    label="Duration"
                    margin="normal"
                    {...register("duration")}
                  />
                </Grid>

                {loadingAudio ? (
                  <>
                    <Typography>Loading audio...</Typography>
                    <CircularProgress />
                  </>
                ) : !loadingAudio && watch("mp3File") ? (
                  <Typography>{watch("mp3File")}</Typography>
                ) : (
                  <Grid item xs={6}>
                    <input
                      style={{ display: "none" }}
                      id="raised-button-audio"
                      type="file"
                      onChange={handleAudioChange}
                    />
                    <label htmlFor="raised-button-audio">
                      <Tooltip title="Please select audio file under 500kb for best performance">
                        <Button component="span">
                          Upload audio (Under 500KB)
                        </Button>
                      </Tooltip>
                    </label>
                  </Grid>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loadingAudio || loadingImage}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </form>
        </FormProvider>
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
    </Box>
  );
};

export default AddSong;
