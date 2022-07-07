import { CustomError } from "../CustomError";

export class VerifyInformationsRequest extends CustomError {
  constructor () {
    super (
      "You need to enter the band name!.", 
        406
      )
  };
};

export class VerifyBandExist extends CustomError {
    constructor (public bandName: string) {
      super (
        `The searched band, ${bandName}, does not existwas not found!.`, 
          404
        )
    };
  };