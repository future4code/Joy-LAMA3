import { IMakeLoginUserModel } from "../model/IMakeLoginUserModel";

import { Database } from "../data/database/Database";

export class MakeLoginUserRepository extends Database implements IMakeLoginUserModel {
    private TABLE_NAME = "LAMA_USUARIOS";

    async findUser (email: string) {
        const [ user ] = await Database.connectionDatabase(this.TABLE_NAME)
        .where("email", email)

        return user
    }
}