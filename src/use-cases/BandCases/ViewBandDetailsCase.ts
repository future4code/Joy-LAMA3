import { VerifyBandExist } from "../../errors/BandErrors/ViewBandDetais";
import { VerifyInformationsRequest } from "../../errors/UsersErrors/CreateCadasterUsersErros";
import { IViewBandDetailsModel } from "../../model/IViewBandDetailsModel";

export class ViewBandDetailsCase {
    constructor(
        private readonly viewBandDetailsRepository: IViewBandDetailsModel
    ){};

    getBandDetais = async (bandName: string) => {

        if(!bandName) throw new VerifyInformationsRequest()
        
        const band = await this.viewBandDetailsRepository.getBand(bandName);

        if(!band) throw new VerifyBandExist(bandName)

        return band;
    }
}