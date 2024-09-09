import { OmitTrackProps } from "./admin";
import { instance } from "./instance";

export interface SearchTracksQuery extends OmitTrackProps {
  isProgress: string;
}

export namespace AxiosTracks {
  export const getTracks = async ({ trackName, cardinalNo, isProgress }: SearchTracksQuery) => {
    const url = `tracks?tracks=${trackName}&cardinalNo=${cardinalNo}&isProgress=${isProgress}`;
    const res = await instance.get(url).then(res => res.data);
    console.log(res);
    return res;
  };
}
