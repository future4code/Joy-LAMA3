import { 
  ICreateCadasterUserModel, 
  ICreateCadasterUserModelData
 } from "../model/ICreateCadasterUserModel";

 import { Database } from "../data/database/Database";

 export class CreateCadasterUserRepository extends Database implements ICreateCadasterUserModel {
  private TABLE_NAME = "LAMA_USUARIOS";

  async create (data: ICreateCadasterUserModelData) {
    await Database.connectionDatabase(this.TABLE_NAME).insert(data);
  };

  async emailExist ( email: string ) {
    const [ userEmail ] = await Database.connectionDatabase(this.TABLE_NAME)
    .where("email", email);

    return !!userEmail;
  };
 };