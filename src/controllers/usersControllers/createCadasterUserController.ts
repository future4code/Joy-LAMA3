import { Request, Response } from "express";

import { CreateCadasterUserRepository } from "../../repositories/CreateCadasterUserRepository";
import { CreateCadasterUserCase } from "../../use-cases/UsersCases/CreateCadasterUserCase";

export const createCadasterUserController = async ( req: Request, res: Response ): Promise<{}> => {
    const { name, email, password, role } = req.body;

    const createCadasterUserRepository = new CreateCadasterUserRepository();

    const createCadasterUserCase = new CreateCadasterUserCase(
      createCadasterUserRepository
    );

    await createCadasterUserCase.createCadaster({
      name,
      email,
      password,
      role
    });
    
    return res.status(201).json({ message: `Usuário ${name} criado com sucesso.` });
};