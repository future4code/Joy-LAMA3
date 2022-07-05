import { Request, Response } from "express";

import { CreateCadasterRepository } from "../../repositories/CreateCadasterRepository";
import { CreateCadasterCase } from "../../use-cases/CreateCadasterCase/CreateCadasterCase";

import { CustomError } from "../../errors/CustomError";

export const createCadasterController = async ( req: Request, res: Response ): Promise<{}> => {
  try {

    const { name, email, password, role } = req.body;

    const createCadasterRepository = new CreateCadasterRepository();

    const createCadasterCase = new CreateCadasterCase(
      createCadasterRepository
    );

    await createCadasterCase.createCadaster({
      name,
      email,
      password,
      role
    });
    
    return res.status(201).json({ message: `Usuário ${name} criado com sucesso.` });
  } catch (error) {
    return error instanceof CustomError
    ?
    res.status(error.statusCode).send(error.message)
    :
    res.status(500).send(error.message || error.sqlMessage)
  };
};