import { IRegisterBandModel } from "../../model/IRegisterBandModel";

import { generateId } from "../../services/generate-id";

import {
  VerifyExistBand,
  VerifyInformationsRequest,
  VerifyRole
} from "../../errors/BandErrors/RegisterBandErrors";

interface IRegisterBandRequest {
  userRole: string;
  name: string;
  photo: string;
  musicGenre: string;
  responsible: string;
};

export class RegisterBandCase {
  constructor (
    private readonly registerBandModel: IRegisterBandModel
  ) {};

  async registerBand ( request: IRegisterBandRequest ) {
    const { 
      userRole,
      name, 
      photo, 
      musicGenre, 
      responsible
    } = request;
    
    //* Errors ===========================================
    if ( userRole !== "ADMIN" ) throw new VerifyRole();

    if ( !name || !photo || !musicGenre || !responsible ) {
      throw new VerifyInformationsRequest();
    };

    const band = await this.registerBandModel.existBand(name);

    if ( band ) throw new VerifyExistBand(name);
    //* ================================================

    const id = generateId();

    await this.registerBandModel.create({
      id,
      name,
      photo,
      music_genre: musicGenre,
      responsible
    })

  };
};