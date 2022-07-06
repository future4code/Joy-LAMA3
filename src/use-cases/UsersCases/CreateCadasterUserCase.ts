import { ICreateCadasterUserModel } from "../../model/ICreateCadasterUserModel";

import { IBCryptAdapter } from "../../adapters/ibcrypt-adapter";
import { IJwtAdapter } from "../../adapters/ijwt-adapter";
import { IMailAdapter } from "../../adapters/inodemailer-adapter";

import { generateId } from "../../services/generate-id";
import { validateEmail } from "../../services/validate-email";
import { checkSpace } from "../../services/check-space";

import { 
  VerifyEmail,
  VerifyIfUserExist,
  VerifyInformationsRequest,
  VerifyPasswordQuantityLine,
  VerifySpacesPassword,
  VerifyRoles
 } from "../../errors/UsersErrors/CreateCadasterUsersErros";


enum Role {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
};

interface ICreateCadasterUserCaseRequest {
  name: string;
  email: string;
  password: string;
  role?: Role;
};

export class CreateCadasterUserCase {
  constructor (
    private readonly createCadasterUserModel: ICreateCadasterUserModel,
    private readonly jwtAdapter: IJwtAdapter,
    private readonly bcryptAdapter: IBCryptAdapter,
    private readonly mailAdapter: IMailAdapter
  ) {};

    async createCadaster ( request: ICreateCadasterUserCaseRequest ) {
      let { name, email, password, role } = request;

      const userEmail = await this.createCadasterUserModel.emailExist(email);

      //* Errors ===================================================
      if ( !name || !email || !password ) throw new VerifyInformationsRequest();

      if ( !validateEmail(email) ) throw new VerifyEmail(email);

      if ( checkSpace(password) )  throw new VerifySpacesPassword();

      if ( password.length > 6 ) throw new VerifyPasswordQuantityLine(password);

      if ( userEmail ) throw new VerifyIfUserExist(email);

      if ( !role ) role = Role.NORMAL;

      if ( role !== Role.NORMAL && role !== Role.ADMIN ) throw new VerifyRoles();
      //* ==========================================================

      const id = generateId();

      const encryptPassword = await this.bcryptAdapter.hashEncrypt({password});

      await this.createCadasterUserModel.create({
        id,
        name,
        email,
        password: encryptPassword,
        role
      });

      const token = this.jwtAdapter.generateToken({id, role});

      await this.mailAdapter.sendMail({
        email: `${email}`,
        subject: "Platorma Dianhos Tech",
        body:  [
          `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
          `<h1>Sucesso</h1>`,
          `<p>Ola <strong>"${name}"<strong/> seu cadastro foi efetuado com sucesso.</p>`,
          `<p>Obrigado!.</p>`,
          `</div>`
        ].join("\n")
      });

      return token;
    };
};