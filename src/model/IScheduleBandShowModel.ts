export interface IScheduleBandShowModelData {
  id: string;
  photo: string;
  week_day: string;
  start_time: number;
  end_time: number;
  band_id: string;
};

export interface IScheduleBandShowModel {
  create: ( data: IScheduleBandShowModelData ) => Promise<void>;
  searchShows: ( day: string ) => Promise<IScheduleBandShowModelData[]>;
};
