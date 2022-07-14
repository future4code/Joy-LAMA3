export interface IMakeLoginuserModelData {
    email: string;
};

export interface IUserOutputData {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  };

export interface IMakeLoginUserModel {

    findUser:(email: string)=> Promise<IUserOutputData>;
};
