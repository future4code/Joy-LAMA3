import { ICreateCadasterUserModel } from "../../model/ICreateCadasterUserModel";

import { generateId } from "../../services/generateId";


enum Role {
  NORMAL = "normal",
  ADMIN = "admin"
};

interface ICreateCadasterUserCaseRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export class CreateCadasterUserCase {
  constructor (
    private readonly createCadasterUserModel: ICreateCadasterUserModel
  ) {};

    async createCadaster ( request: ICreateCadasterUserCaseRequest ) {
      const { name, email, password, role } = request;

      const userEmail = await this.createCadasterUserModel.emailExist(email);

      if ( !name || !email || !password || !role ) throw new Error("Ola mundo.");

      if ( userEmail ) throw new Error("Existe.");

      const id = generateId();

      await this.createCadasterUserModel.create({
        id,
        name,
        email,
        password,
        role
      });
    };
};
