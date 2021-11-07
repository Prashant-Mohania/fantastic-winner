import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entity/user_entity";
import { Request, Response } from "express";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  //Create new User
  async createUser(
    gender: String,
    firstName: String,
    lastName: String,
    userId: String
  ) {
    await this.createQueryBuilder("users")
      .insert()
      .values({
        user_id: userId,
        user_first_name: firstName,
        user_last_name: lastName,
        user_gender: gender,
      })
      .execute();
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
      let data = this.createQueryBuilder("users")
        .where("user_email=:user_email", { user_email: user_email })
        .getOne();
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  }
}
