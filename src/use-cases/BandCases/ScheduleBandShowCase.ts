import { IScheduleBandShowModel } from "../../model/IScheduleBandShowModel";

import { generateId } from "../../utils/generate-id";

import { ValidDays, validDayShow } from "../../errors/BandErrors/ScheduleBandShowErros";

interface IScheduleBandShowRequestData {
  roleUser: string,
  photo: string;
  weekDay: ValidDays;
  startTime: number;
  endTime: number;
  bandId: string;
};

export class ScheduleBandShowCase {
  constructor (
    private scheduleBandShowModel: IScheduleBandShowModel
  ) {};

  async scheduleBandShow ( request: IScheduleBandShowRequestData ) {
    const { 
      roleUser,
      photo,
      weekDay,
      startTime,
      endTime,
      bandId
    } = request;

    //* Errors ==============================================================
    if ( roleUser !== "ADMIN" ) throw new Error("No auth");

    if ( !photo || !weekDay || !startTime || !endTime || !bandId ) {
      throw new Error ("not request necessary");
    };

    if ( validDayShow(weekDay) ) {
      throw new Error ("Days invalid. valid (d, s ,s)");
    };

    const shows = await this.scheduleBandShowModel.searchShows(weekDay);
    const showsATthisTime = shows.filter(( show ) => show.start_time === startTime);

    if ( showsATthisTime.length ) throw new Error ("Show exist");

    if ( startTime < 8 || startTime > 23 ) throw new Error ("Hour naw invalid");
    //* ============================================================================

    const id = generateId();

    await this.scheduleBandShowModel.create({
      id,
      photo,
      week_day: weekDay,
      start_time: startTime,
      end_time: endTime,
      band_id: bandId
    });
  };
};