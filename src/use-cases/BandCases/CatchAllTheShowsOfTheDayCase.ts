import { 
  ICatchAllTheShowsOfTheDayModel
 } from "../../model/ICatchAllShowsThatDayModel";

 import { 
  VerifyIfContainRequest,
  validDayShow,
  VerifyDays,
  VerifyListContainShowsInDay
} from "../../errors/BandErrors/CatchAllTheShowsOfTheDayErrors";


interface ICatchAllTheShowsOfTheCaseData {
  chosenDay: string;
};

export class CatchAllTheShowsOfTheDayCase {
  constructor (
    private readonly catchAllTheShowsOfTheDayModel: 
    ICatchAllTheShowsOfTheDayModel
  ) {};

  async catchAllShowsOfTheDayCase ( request: ICatchAllTheShowsOfTheCaseData ) {
    const { chosenDay } = request;

    //* Errors ==================================================
    if ( !chosenDay ) throw new VerifyIfContainRequest();

    if ( validDayShow(chosenDay) ) throw new VerifyDays();

    const shows = await this.catchAllTheShowsOfTheDayModel
    .searchShows(chosenDay);

    if ( shows.length === 0 ) {
      throw new VerifyListContainShowsInDay();
    };
    //* ==========================================================

    const showsFoundOnTheDay = shows.map(( show ) => {
      const starTime = show.start_time;
      const finalShowTime = show.start_time + show.end_time;

      return {
        bandId: show.band_id,
        nameBand: show.name,
        genre: show.music_genre,
        starTime,
        finalShowTime
      };
    });

    return showsFoundOnTheDay;
  };
};