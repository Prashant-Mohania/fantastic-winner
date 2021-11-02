import { Request, Response } from "express";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError, initializeApp } from "firebase/app"
import { firebaseConfig } from "../firebase_config";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../db/repos/user_repo";


const app = initializeApp(firebaseConfig)

export class AuthController {
    static async signUp(req: Request, res: Response) {
        let { email, password, f_name, l_name } = req.body;
        let auth = getAuth();

        await createUserWithEmailAndPassword(auth, email, password).then(async (val) => {
            let tokenToString = await val.user.getIdToken()

            let userRepo = getCustomRepository(UserRepository);
            await userRepo.createUser(email, f_name, l_name, val.user.uid);

            res.status(200).json({
                "auth": true,
                "msg": "Success",
                "token": tokenToString,
            });
        }).catch((err: FirebaseError) => {
            let msg = err.message.split("/")[1]
            res.status(500).json({
                "auth": false,
                // "msg": msg.slice(0, msg.length - 2),
                "msg": msg,
            });
        });
    }

    static async signIn(req: Request, res: Response) {
        let { email, password } = req.body;
        let auth = getAuth();

        await signInWithEmailAndPassword(auth, email, password).then(async (val) => {


            let tokenToString = await val.user.getIdToken()

            res.status(200).json({
                "auth": true,
                "msg": "Success",
                "token": tokenToString,
            });
        }).catch((err: FirebaseError) => {
            let msg = err.message.split("/")[1]
            res.status(401).json({
                "auth": false,
                "msg": msg.slice(0, msg.length - 2),
            })
        });
    }
}