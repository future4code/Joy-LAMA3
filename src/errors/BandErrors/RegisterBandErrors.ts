import { CustomError } from "../CustomError";

export class VerifyInformationsRequest extends CustomError {
  constructor () {
    super (
      "Check that one of these information is not missing: ( name, photo, musicGenre, responsible )!.", 
        406
      )
  };
};

export class VerifyExistBand extends CustomError {
  constructor ( public name: string ) {
    super (
      `There is already a band registered with this name: (${name})!.`, 
        409
      )
  };
};

export class VerifyRole extends CustomError {
  constructor () {
    super (
      `Only admin users can register bands!.`, 
        401
      )
  };
};
