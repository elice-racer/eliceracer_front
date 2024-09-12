import { OmitTrackProps, ResData } from "./admin";
import { instance } from "./instance";

export interface SearchTracksQuery extends OmitTrackProps {}

export interface TrackListType extends OmitTrackProps {
  id: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  users: number;
  projects: number;
}

export namespace AxiosTracks {
  export const getTracks = async ({ trackName, cardinalNo }: OmitTrackProps): Promise<ResData<TrackListType[]>> => {
    const url = `tracks?pageSize=30&trackName=${trackName}&cardinalNo=${cardinalNo}`;
    const res = await instance.get(url).then(res => res.data);
    console.log(res);
    return res;
  };
}
