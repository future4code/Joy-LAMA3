enum Role {
  NORMAL = "normal",
  ADMIN = "admin"
};

export interface ICreateCadasterUserModelData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
};

export interface ICreateCadasterUserModel {
  create: ( data: ICreateCadasterUserModelData ) => Promise<void>;
  emailExist: ( email: string ) => Promise<boolean>;
};