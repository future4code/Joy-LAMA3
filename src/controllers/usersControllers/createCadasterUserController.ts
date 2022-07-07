import { Request, Response } from "express";

import { CreateCadasterUserRepository } from "../../repositories/CreateCadasterUserRepository";
import { CreateCadasterUserCase } from "../../use-cases/UsersCases/CreateCadasterUserCase";

import { JwtAdapter } from "../../adapters/Jwt/Jwt-adapter";
import { BCryptAdapter } from "../../adapters/Bcrypt/Bcrypt-adapter";
import { NodemailerMailAdapter } from "../../adapters/Nodemailer/Nodemailer-adapter";

export const createCadasterUserController = async ( req: Request, res: Response ): Promise<{}> => {
    let { name, email, password, role } = req.body;

    const createCadasterUserRepository = new CreateCadasterUserRepository();

    const jwtAdapter = new JwtAdapter();
    const bcryptAdapter = new BCryptAdapter();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const createCadasterUserCase = new CreateCadasterUserCase(
      createCadasterUserRepository,
      jwtAdapter,
      bcryptAdapter,
      nodemailerMailAdapter
    );

    if ( role ) role = role.toUpperCase();

    const tokenSuccess = await createCadasterUserCase.createCadaster({
      name,
      email,
      password,
      role
    });
    
    return res.status(201).json({ 
      message: `Usuário: ${name} criado com sucesso.`,
      token: tokenSuccess
    });
};