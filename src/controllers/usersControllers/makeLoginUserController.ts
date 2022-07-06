import { Request, Response } from "express";

import { MakeLoginUserUserCase } from "../../use-cases/UsersCases/MakeLoginUserUserCase";

import { MakeLoginUserRepository } from "../../repositories/MakeLoginUserRepository";
import { JwtAdapter } from "../../adapters/Jwt/Jwt-adapter";
import { BCryptAdapter } from "../../adapters/Bcrypt/Bcrypt-adapter";

export const makeLoginUserController = async ( req: Request, res: Response ): Promise<{}> => {

    const { email, password } = req.body;

    const makeLoginUserRepository = new MakeLoginUserRepository();

    const jwtAdapter = new JwtAdapter();
    const bcryptAdapter = new BCryptAdapter();
    
    const makeLoginUserCase = new MakeLoginUserUserCase(makeLoginUserRepository, jwtAdapter, bcryptAdapter);

    const tokenSuccess = await makeLoginUserCase.loginUser({ email, password });

    return res.status(200).json({tokenSuccess});
}