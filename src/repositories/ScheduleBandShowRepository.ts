import { 
  IScheduleBandShowModel, 
  IScheduleBandShowModelData 
} from "../model/IScheduleBandShowModel";

import { Database } from "../data/database/Database";

export class ScheduleBandShowRepository 
extends Database 
implements IScheduleBandShowModel {
  //* Privado versão nova js
  #TABLE_NAME = "LAMA_SHOWS";

  async create ( data: IScheduleBandShowModelData ) {
    await Database.connectionDatabase(this.#TABLE_NAME)
    .insert(data);
  };

  async searchShows ( day: string ) {
    const showsInTheDay = await Database.connectionDatabase(this.#TABLE_NAME)
    .select().where("week_day", day);

    return showsInTheDay;
  };
};