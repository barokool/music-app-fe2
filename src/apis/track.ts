import { api } from ".";

export const createTrack = async (body: any) => {
  const data = await api.post("tracks", body);
  return data.data;
};

export const getAllTracks = async () => {
  const data = await api.get("tracks");
  return data.data;
};

export const getTrack = async (slug: string) => {
  const data = await api.get(`tracks/detail/${slug}`);
  return data.data;
};
