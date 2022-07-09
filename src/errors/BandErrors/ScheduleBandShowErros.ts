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


export class VerifyRole extends CustomError {
  constructor () {
    super (
      "Only admin users can do this type of action!.", 
        401
      )
  };
};

export class VerifyIfAndNumber extends CustomError {
  constructor () {
    super (
      `Only numeric value is accepted!.`, 
        406
      )
  };
};

export class VerifyIfContainsValuesRequest extends CustomError {
  constructor () {
    super (
      `Make sure one of these information is not missing: ( !photo, weekDay, startTime, endTime, bandId )!.`, 
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

export class VerifyIfNumberIsInteger extends CustomError {
  constructor () {
    super (
      `Only and accept integer values!.`, 
        406
      )
  };
};

export class VerifyIfHourStartTime extends CustomError {
  constructor () {
    super (
      `Vailable hours are from 8 am to 23 pm!.`, 
        406
      )
  };
};

export class VerifyIfHourEndTime extends CustomError {
  constructor () {
    super (
      `The maximum show time is up to 8 hours!.`, 
        406
      )
  };
};

export class VerifyIfHourStartTimeEqualStartTime extends CustomError {
  constructor () {
    super (
      `There is already a show scheduled for this time!.`, 
        409
      )
  };
};

export class VerifyShowAfterStartTimeTerm extends CustomError {
  constructor () {
    super (
      `There is already a show in progress at this time!.`, 
        409
      )
  };
};

export class VerifyShowBeforeStartTimeTerm extends CustomError {
  constructor () {
    super (
      `There is already a show in progress at this time!.`, 
        409
      )
  };
};