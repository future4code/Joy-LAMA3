import { CustomError } from "../CustomError";

export class VerifyEmail extends CustomError {
    constructor ( public email: string ) {
      super (
        `Past email: ( ${email} ), does not follow the correct pattern!. Example: ( user@gmail.com )!.`, 
          406
        )
    };
  };

  export class VerifyContainsEmail extends CustomError {
    constructor () {
      super (
        `Check your email!.`, 
          406
        )
    };
  }

  export class VerifyExistEmail extends CustomError {
    constructor () {
      super (
        `E-mail not found!.`, 
        404
        )
      };
    }

  export class VerifyPasswordQuantityLine extends CustomError {
    constructor ( public password: string ) {
      super (
        `The password must be at least 6 characters long. Your password has: ( ${password.length} )!.`, 
          406
        )
    };
  };
  
    export class VerifyContainsPassword extends CustomError {
      constructor () {
        super (
          `Check your password!.`, 
            406
          )
      };
    }
    export class VerifyCorrectPassword extends CustomError {
      constructor () {
        super (
          `Password incorrect!.`, 
            406
          )
      };
    }