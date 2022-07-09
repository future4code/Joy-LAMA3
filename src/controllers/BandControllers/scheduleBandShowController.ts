import { Request, Response } from "express";

import { ScheduleBandShowRepository } from "../../repositories/ScheduleBandShowRepository";
import { ScheduleBandShowCase } from "../../use-cases/BandCases/ScheduleBandShowCase";

export const scheduleBandShowController = async ( req: Request, res: Response)
: Promise<{}> => {
   const roleUser = req.role;

  const bandId = req.params.id;
  let { 
    photo,
    weekDay,
    startTime,
    endTime
   } = req.body;

   const scheduleBandShowRepository = new ScheduleBandShowRepository();

   const scheduleBandShowCase = new ScheduleBandShowCase(
    scheduleBandShowRepository
   );

   if ( weekDay && startTime && endTime ) {
      weekDay = weekDay.toLowerCase();
      //* Sinal de ( + ) transforma um valor string em número.
      startTime = +startTime;
      endTime = +endTime;
   };

   await scheduleBandShowCase.scheduleBandShow({
      roleUser,
      photo,
      weekDay,
      startTime,
      endTime,
      bandId
   });

   return res.status(201).json({ message: "Show agendado com sucesso." });
};