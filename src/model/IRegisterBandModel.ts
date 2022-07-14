export interface IRegisterBandModelData {
  id: string;
  name: string;
  photo: string;
  music_genre: string;
  responsible: string;
};

export interface IRegisterBandModel {
  create: ( data: IRegisterBandModelData ) => Promise<void>;
  existBand: ( bandName: string ) => Promise<boolean>;
};