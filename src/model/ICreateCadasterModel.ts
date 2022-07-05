enum Role {
  NORMAL = "normal",
  ADMIN = "admin"
};

export interface ICreateCadasterModelData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
};

export interface ICreateCadasterModel {
  create: ( data: ICreateCadasterModelData ) => Promise<void>;
  emailExist: ( email: string ) => Promise<boolean>;
};