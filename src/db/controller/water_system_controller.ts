import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { WaterSystemRepository } from "../repos/water_system_repo";

export class WaterSystemController {
  static async fetchWaterSystemDetails(req: Request, res: Response) {
    let water_systemRepo = getCustomRepository(WaterSystemRepository);
    await water_systemRepo.fetchWaterSystemDetails(req, res);
  }
}
