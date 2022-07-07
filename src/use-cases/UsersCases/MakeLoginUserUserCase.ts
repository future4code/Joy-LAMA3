import { IMakeLoginUserModel } from "../../model/IMakeLoginUserModel";
import { IJwtAdapter } from "../../adapters/ijwt-adapter";
import { IBCryptAdapter } from "../../adapters/ibcrypt-adapter";
import { validateEmail } from "../../utils/validate-email";

import { VerifyEmail,
    VerifyPasswordQuantityLine,
    VerifyContainsEmail,
    VerifyContainsPassword,
    VerifyExistEmail,
    VerifyCorrectPassword
} from "../../errors/UsersErrors/MakeLoginUserErrors";

interface IMakeLoginUserCaseRequest {
    email: string;
    password: string;
}

export class MakeLoginUserUserCase {
    constructor (
        private readonly makeLoginUserModel: IMakeLoginUserModel,
        private readonly jwtAdapter: IJwtAdapter,
        private readonly bcryptAdapter: IBCryptAdapter
    ) {};

    async loginUser ( request: IMakeLoginUserCaseRequest ) {
        const {email, password} = request;

        const userMail = await this.makeLoginUserModel.findUser(email);
        
        if (!email) throw new VerifyContainsEmail();
        
        
        if (!password) throw new VerifyContainsPassword();
        
        if (password.length < 6) throw new VerifyPasswordQuantityLine(password);
                
        if ( !validateEmail(email) ) throw new VerifyEmail(email);
        
        if (!userMail) throw new VerifyExistEmail();

        const passwordDatabase = userMail.password;
        
        const comparePassword = await this.bcryptAdapter.compareHash({ password, passwordDatabase });
        
        if ( !comparePassword ) throw new VerifyCorrectPassword();

        const token = this.jwtAdapter.generateToken({ id: userMail.id, role: userMail.role});

        return token;

    }
};
