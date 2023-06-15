import { api } from ".";

export const createPlaylist = async (body: any) => {
  const data = await api.post("playlists", body);
  return data.data;
};

export const getPlaylists = async () => {
  const data = await api.get("playlists");
  return data.data;
};

export const updateTrackToPlaylist = async (
  playlistSlug: string,
  body: any
) => {
  const data = await api.post(`playlists/${playlistSlug}/track`, body);
  return data.data;
};

export const deleteTrackToPlaylist = async (
  playlistSlug: string,
  trackSlug: string
) => {
  const data = await api.delete(`playlists/${playlistSlug}/track/${trackSlug}`);
  return data.data;
};
