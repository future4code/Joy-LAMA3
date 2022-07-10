interface IShowOutputData {
  id: string;
  name: string;
  photo: string;
  music_genre: string;
  responsible: string;
  week_day: string;
  start_time: number;
  end_time: number;
  band_id: string;
};


export interface ICatchAllTheShowsOfTheDayModel {
  searchShows: ( chosenDay: string ) => 
  Promise<IShowOutputData[]>;
};