import { 
  ICreateCadasterModel, 
  ICreateCadasterModelData
 } from "../model/ICreateCadasterModel";

 import { Database } from "../data/database/Database";

 export class CreateCadasterRepository extends Database implements ICreateCadasterModel {
  private TABLE_NAME = "LAMA_USUARIOS";

  async create (data: ICreateCadasterModelData) {
    await Database.connectionDatabase(this.TABLE_NAME).insert(data);
  };

  async emailExist ( email: string ) {
    const [ userEmail ] = await Database.connectionDatabase(this.TABLE_NAME)
    .where("email", email);

    return !!userEmail;
  };
 };