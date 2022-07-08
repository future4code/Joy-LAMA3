export enum ValidDays {
  FRIDAY = "sexta",
  SATURDAY= "sábado",
  SUNDAY = "domingo"
};


export const validDayShow = ( day: string ): boolean => {
  const result = day !== ValidDays.FRIDAY && day !== ValidDays.SATURDAY && day !== ValidDays.SUNDAY;
  return result;
};