import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entity/user_entity";
import { Request, Response } from "express";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  //Create new User
  async createUser(req: Request, res: Response) {
    const { user_first_name, user_email, user_last_name, user_gender } =
      req.body;
    try {
      let user = new UserEntity();
      user.user_first_name = user_first_name;
      user.user_last_name = user_last_name;
      user.user_email = user_email;
      user.user_gender = user_gender;

      let userData = await this.save(user);
      return res.send(userData);
    } catch (error) {
      res.send(error);
    }
  }

  // //Update email
  // async upadateEmail(req: Request, res: Response) {
  //   const { user_email, user_id } = req.body;
  //   try {
  //     let data = await this.createQueryBuilder("user")
  //       .update(UserEntity)
  //       .set({
  //         user_email: user_email,
  //       })
  //       .where("user_id =:user_id", { user_id: user_id })
  //       .execute();
  //     return res.send(data);
  //   } catch (error) {
  //     res.send(error);
  //   }
  // }

  async userDetails(req: Request, res: Response) {
    const { user_email } = req.body;
    try {
      let data = this.createQueryBuilder("user")
        .where("user_email=:user_email", { user_email: user_email })
        .getOne();
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  }
}
