import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entity/user_entity";
import { Request, Response } from "express";

// import firebase from 'firebase/auth';
// import 'firebase/auth';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{
    async createUser(req: Request, res: Response) {
        let { email, password } = req.body;
        console.log(req.body);
        // let auth = firebase.getAuth();
        // await firebase.createUserWithEmailAndPassword(auth, email, password).then((val) => {
        //     console.log(val.user.email);
        //     res.send({
        //         "auth": true,
        //         "msg": "Succesfully user created",
        //     })
        // }).catch((err) => {
        //     console.log(err);
        //     res.send({
        //         "auth": false,
        //         "msg": "something went wrong try again!!!"
        //     });
        // });
    }
}