import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repos/user_repo";

export class UserController {
  static async createUser(req: Request, res: Response) {
    let userRepo = getCustomRepository(UserRepository);
    await userRepo.createUser(req, res);
  }
  static async updateEmail(req: Request, res: Response) {
    let userRepo = getCustomRepository(UserRepository);
    await userRepo.upadateEmail(req, res);
  }
}
