import {   IViewBandDetailsModel } from "../model/IViewBandDetailsModel";

import { Database } from "../data/database/Database";

export class ViewBandDetailsRepository
  extends Database
  implements IViewBandDetailsModel
{
  private TABLE_NAME = "LAMA_BANDAS";

  async getBand(bandName: string) {
    const [band] = await Database.connectionDatabase(this.TABLE_NAME)
    .where("name", bandName);
    
    return band;
  }
}
