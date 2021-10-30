import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entity/user_entity";
import { Request, Response } from "express";


@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{
    async createUser(req: Request, res: Response) {}
}