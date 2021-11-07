import { EntityRepository, Repository } from "typeorm";
import { TankDetailsEntity } from "../entity/tank_entity";
import { Request, Response } from "express";

@EntityRepository(TankDetailsEntity)
export class TankRepository extends Repository<TankDetailsEntity> {
  async fetchTankDetails(req: Request, res: Response) {
    const user_id = req.params.user_id;
    try {
      let data = this.createQueryBuilder("tank_details")
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
