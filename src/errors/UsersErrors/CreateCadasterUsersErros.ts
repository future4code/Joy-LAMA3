import { CustomError } from "../CustomError";

export class VerifyInformationsRequest extends CustomError {
  constructor () {
    super (
      "Check that one of these information is not missing:( name, email, password )!", 
        406
      )
  };
};

export class VerifyEmail extends CustomError {
  constructor ( public email: string ) {
    super (
      `Past email: ( ${email} ), does not follow the correct pattern!. Example: ( user@gmail.com ).`, 
        406
      )
  };
};

export class VerifyIfUserExist extends CustomError {
  constructor ( public email: string ) {
    super (
      `There is already a registered user with this email address: ( ${email} )!.`, 
        409
      )
  };
};

export class VerifySpacesPassword extends CustomError {
  constructor () {
    super (
      `The password passed cannot contain blanks!.`, 
        406
      )
  };
};

export class VerifyPasswordQuantityLine extends CustomError {
  constructor ( public password: string ) {
    super (
      `The password cannot be less than 6 digits. Your password contains: ( ${password.length} )!.`, 
        406
      )
  };
};

export class VerifyRoles extends CustomError {
  constructor () {
    super (
      `The roles must be "Normal" or "ADMIN"!.`, 
        406
      )
  };
};