import { Request, Response } from "express";

import { ViewBandDetailsRepository } from "../../repositories/ViewBandDetailsRepository";
import { ViewBandDetailsCase } from "../../use-cases/BandCases/ViewBandDetailsCase";

export const ViewBandDetailsController = async ( req: Request, res: Response ): Promise<{}> => {
    const bandName = req.params.bandName;
        
    const viewBandDetailsRepository = new ViewBandDetailsRepository();

    const viewBandDetailsCase = new ViewBandDetailsCase(viewBandDetailsRepository);

    const band = await viewBandDetailsCase.getBandDetais(bandName);

    return res.status(200).json(band)
    
}