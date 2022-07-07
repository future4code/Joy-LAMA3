import { IRegisterBandModel, IRegisterBandModelData } from "../model/IRegisterBandModel";

import { Database } from "../data/database/Database";

export class RegisterBandRepository extends Database implements IRegisterBandModel {
  private TABLE_NAME = {
    tableBand: "LAMA_BANDAS",
    tableUser: "LAMA_USUARIOS"
  };

  async create ( data: IRegisterBandModelData ) {
    await Database.connectionDatabase(this.TABLE_NAME.tableBand).insert(data);
  };
  
  async existBand ( bandName: string ) {
    const [ band ] = await Database.connectionDatabase(this.TABLE_NAME.tableBand)
    .where("name", bandName);

    return !!band
  };
};