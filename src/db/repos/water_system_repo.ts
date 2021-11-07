import { EntityRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import { WaterSystemEntity } from "../entity/water_system_entity";

@EntityRepository(WaterSystemEntity)
export class WaterSystemRepository extends Repository<WaterSystemEntity> {
  async fetchWaterSystemDetails(req: Request, res: Response) {
    const user_id = req.params.user_id;
    try {
      let data = this.createQueryBuilder("water_system")
        .where("user_id=:user_id", {
          user_id: user_id,
        })
        .getOne();
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  }
}
