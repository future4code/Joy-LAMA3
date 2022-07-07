import { CustomError } from "../CustomError";

export class VerifyInformationsRequest extends CustomError {
  constructor () {
    super (
      "Verifique si uma dessas informações não estaõ faltando: ( name, photo, musicGenre, responsible )!", 
        406
      )
  };
};

export class VerifyExistBand extends CustomError {
  constructor ( public name: string ) {
    super (
      `Já existe uma banda cadastrada com esse nome: (${name})!.`, 
        409
      )
  };
};

export class VerifyRole extends CustomError {
  constructor () {
    super (
      `Apenas usuários administradores podem cadastrar bandas!.`, 
        401
      )
  };
};
