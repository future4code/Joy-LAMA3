import { ICreateCadasterModel } from "../../model/ICreateCadasterModel";

import { generateId } from "../../services/generateId";


enum Role {
  NORMAL = "normal",
  ADMIN = "admin"
};

interface ICreateCadasterCaseRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export class CreateCadasterCase {
  constructor (
    private readonly createCadasterModel: ICreateCadasterModel
  ) {};

    async createCadaster ( request: ICreateCadasterCaseRequest ) {
      const { name, email, password, role } = request;

      const userEmail = await this.createCadasterModel.emailExist(email);

      if ( !name || !email || !password || !role ) throw new Error("Ola mundo.");

      if ( userEmail ) throw new Error("Existe.");

      const id = generateId();

      await this.createCadasterModel.create({
        id,
        name,
        email,
        password,
        role
      });
    };
};
