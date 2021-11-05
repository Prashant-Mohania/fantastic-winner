import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entity/user_entity";
import { Request, Response } from "express";


@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{
    async createUser(email: String, firstName: String, lastName: String, userId: String) {
        await this.createQueryBuilder("users").insert().values({
            user_id: userId,
            user_first_name: firstName,
            user_last_name: lastName,
            user_gender: ""
        }).execute();
    }
}