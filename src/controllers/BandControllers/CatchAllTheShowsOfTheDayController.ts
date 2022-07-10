import { Request, Response } from "express";

import { 
  CatchAllTheShowsOfTheDayRepository 
} from "../../repositories/CatchAllTheShowsOfTheDayRepository";

import {
  CatchAllTheShowsOfTheDayCase
} from "../../use-cases/BandCases/CatchAllTheShowsOfTheDayCase";


export const catchAllTheShowsOfTheDayController = async (
  req: Request, res: Response
) => {
  let chosenDay = req.query.chosenDay as string;

  const catchAllTheShowsOfTheDayRepository =
   new CatchAllTheShowsOfTheDayRepository();

   const catchAllTheShowsOfTheDayCase = 
   new CatchAllTheShowsOfTheDayCase(
    catchAllTheShowsOfTheDayRepository
   );

   if ( chosenDay ) {
    chosenDay = chosenDay.toLowerCase();
   };

   const resultShows = await catchAllTheShowsOfTheDayCase
   .catchAllShowsOfTheDayCase({chosenDay});

   return res.status(200).json({bands: resultShows});
};