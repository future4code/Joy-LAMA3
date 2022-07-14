import { Request, Response } from "express";

import {  RegisterBandRepository } from "../../repositories/RegisterBandRepository";
import { RegisterBandCase } from "../../use-cases/BandCases/RegisterBandCase";

export const registerBandController = async ( req: Request, res: Response): Promise<{}> => {
  const userRole = req.role;

  const { 
    name, 
    photo, 
    musicGenre, 
    responsible 
  } = req.body;

  const registerBandRepository = new RegisterBandRepository();

  const registerBandCase = new RegisterBandCase(
    registerBandRepository
  );

  await registerBandCase.registerBand({
    userRole,
    name,
    photo,
    musicGenre,
    responsible
  });

  return res.status(201).json({ message: `Banda: ${name}. Registrada com sucesso.` });
};