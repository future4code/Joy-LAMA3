interface IViewBandOutPutModelData {
    id: string;
    name: string;
    photo: string;
    music_genre: string;
    responsible: string;
}

export interface IViewBandDetailsModel {
    getBand:(bandName: string)
    => Promise<IViewBandOutPutModelData>
}