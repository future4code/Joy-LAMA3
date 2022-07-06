import * as jwt from "jsonwebtoken";

import { 
  IJwtAdapter,  
  IJwtAdapterAuthenticationData, 
  IJwtGetTokenData 
} from "../ijwt-adapter";


export class JwtAdapter implements IJwtAdapter {
  generateToken ( { id, role }: IJwtAdapterAuthenticationData ) {
    const expiresIn = "24h";
    const toke = jwt.sign(
      {
        id,
        role
      },
        process.env.JWT_KEY as string,
     {
        expiresIn
     }
    );
    return toke;
  };

  getTokenData ({ token }: IJwtGetTokenData) {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as IJwtAdapterAuthenticationData;
    const result = {
      id: payload.id,
    };
    return result;
  };
};