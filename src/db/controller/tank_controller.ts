import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { TankRepository } from "../repos/tank_repo";

export class TankController {
  static async fetchTankDetails(req: Request, res: Response) {
    let tankRep = getCustomRepository(TankRepository);
    await tankRep.fetchTankDetails(req, res);
  }
}
