import { CustomError } from "../CustomError";


export enum ValidDays {
  FRIDAY = "sexta",
  SATURDAY= "sábado",
  SUNDAY = "domingo"
};


export const validDayShow = ( day: string ): boolean => {
  const result = day !== ValidDays.FRIDAY && day !== ValidDays.SATURDAY && day !== ValidDays.SUNDAY;
  return result;
};

export class VerifyIfContainRequest extends CustomError {
  constructor () {
    super (
      `choose a day between: Friday, Saturday and Sunday`, 
        406
      )
  };
};

export class VerifyDays extends CustomError {
  constructor () {
    super (
      `The days available are: Friday, Saturday or Sunday!.`, 
        406
      )
  };
};

export class VerifyListContainShowsInDay extends CustomError {
  constructor () {
    super (
      `no shows were found that day!.`, 
        404
      )
  };
};

