import { IScheduleBandShowModel } from "../../model/IScheduleBandShowModel";

import { generateId } from "../../utils/generate-id";

import { 
  ValidDays, 
  validDayShow,
  VerifyDays,
  VerifyIfAndNumber,
  VerifyIfContainsValuesRequest,
  VerifyIfHourEndTime,
  VerifyIfHourStartTime,
  VerifyIfHourStartTimeEqualStartTime,
  VerifyIfNumberIsInteger,
  VerifyRole,
  VerifyShowAfterStartTimeTerm,
  VerifyShowBeforeStartTimeTerm
 } from "../../errors/BandErrors/ScheduleBandShowErros";

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
    private readonly scheduleBandShowModel: IScheduleBandShowModel
  ) {};

  async scheduleBandShow ( request: IScheduleBandShowRequestData ) {
    let { 
      roleUser,
      photo,
      weekDay,
      startTime,
      endTime,
      bandId
    } = request;

    //* Errors ==============================================================
    if ( roleUser !== "ADMIN" ) throw new VerifyRole();

    //* Si o número vim uma frase o operador ( + ) no controller ira
    //* tranforma-lo em um valor NaN que e falso.
    if ( !!startTime === false || !!endTime == false ) {
      throw new VerifyIfAndNumber();
    };

    if ( !photo || !weekDay || !startTime || !endTime || !bandId ) {
      throw new VerifyIfContainsValuesRequest();
    };

    if ( validDayShow(weekDay) ) {
      throw new VerifyDays();
    };

    if ( !Number.isInteger(startTime) || !Number.isInteger(endTime) ) {
      throw new VerifyIfNumberIsInteger();
    };
    
    if ( startTime < 8 || startTime > 23 ) {
      throw new VerifyIfHourStartTime();
    };

    if( endTime > 8 || endTime <= 0 ) {
      throw new VerifyIfHourEndTime();
    };

    const shows = await this.scheduleBandShowModel.searchShows(weekDay);

    const shows_at_this_time = shows
    .find(( show ) => show.start_time === startTime);

    if ( shows_at_this_time ) {
      throw new VerifyIfHourStartTimeEqualStartTime();
    };

    //* Busca o primeiro show existente maior que a hora do show a ser
    //* marcado no caso ( startTime ).
    const showsAfterStartTimeTerm = shows
    .sort(( a, b ) => a.start_time - b.start_time)
    .find(( show ) => show.start_time > startTime);

    //* Buscar o show existente menor que a hora do inicio.
    const showsBeforeStartTimeTerm = shows
    .filter(( show ) => show.start_time < startTime)
    .sort(( a , b) => a.start_time - b.start_time)
    .at(-1);

    if ( showsAfterStartTimeTerm ) {
        //* Duração total do show do usuário.
        const user_show_duration = startTime + endTime;

        if ( user_show_duration > showsAfterStartTimeTerm.start_time ) {
          throw new  VerifyShowAfterStartTimeTerm();
        };
      };

      if ( showsBeforeStartTimeTerm ) {
        //* Duração total do show já existente.
        const total_duration_of_existing_show =
        showsBeforeStartTimeTerm.start_time + showsBeforeStartTimeTerm.end_time;

        if ( startTime < total_duration_of_existing_show ) {
          throw new  VerifyShowBeforeStartTimeTerm();
        };
      };
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