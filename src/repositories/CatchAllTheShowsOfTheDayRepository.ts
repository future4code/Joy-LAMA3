import { 
  ICatchAllTheShowsOfTheDayModel
} from "../model/ICatchAllShowsThatDayModel";

import { Database } from "../data/database/Database";

export class CatchAllTheShowsOfTheDayRepository 
extends Database
implements ICatchAllTheShowsOfTheDayModel {
  #TABLE_NAME = {
    shows: "LAMA_SHOWS",
    bands: "LAMA_BANDAS"
  };

  async searchShows ( chosenDay: string ) {
    const shows = await Database
    .connectionDatabase(this.#TABLE_NAME.shows)
    .select()
    .innerJoin(
      `${this.#TABLE_NAME.bands}`,
      `LAMA_SHOWS.band_id`,
      `LAMA_BANDAS.id`
    ).where("week_day", chosenDay)
    .orderBy("start_time","ASC");

    return shows;
  };
};