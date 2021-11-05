import { Request, Response } from "express";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword, sendPasswordResetEmail, } from "firebase/auth";
import { FirebaseError, initializeApp } from "firebase/app"
import { firebaseConfig } from "../firebase_config";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../db/repos/user_repo";


const app = initializeApp(firebaseConfig)

export class AuthController {

    // create user account
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
            res.status(501).json({
                "auth": false,
                "msg": msg.slice(0, msg.length - 2),
                // "msg": msg,
            });
        });
    }

    // login user account
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

    // update the password
    static async updatePassword(req: Request, res: Response) {
        let { password } = req.body;
        let auth = getAuth();
        console.log("Okay");

        await updatePassword(auth.currentUser!, password)
            .then(async (val) => {
                res.status(200).json({
                    "msg": "Password Updated",
                });
            }).catch((err: FirebaseError) => {
                console.log(err);
                let msg = err.message.split("/")[1]
                res.status(401).json({
                    // "msg": msg.slice(0, msg.length - 2),
                    "msg": msg,
                })
            });
    }

    // forgot user password
    static async forgotPassword(req: Request, res: Response) {
        let { email } = req.body;
        let auth = getAuth();
        console.log("Okay");
        await sendPasswordResetEmail(auth, email)
            .then(async (val) => {
                res.status(200).json({
                    "msg": "password reset email send",
                });
            }).catch((err: FirebaseError) => {
                console.log(err);
                let msg = err.message.split("/")[1]
                res.status(401).json({
                    // "msg": msg.slice(0, msg.length - 2),
                    "msg": msg,
                })
            });
    }

    // updating a email
    static async updateEmail(req: Request, res: Response) {
        let { email } = req.body;
        let auth = getAuth();

        let userRepo = getCustomRepository(UserRepository);
        await userRepo.updateDBEmail(email);

        await updateEmail(auth.currentUser!, email)
            .then(async (val) => {
                res.status(200).json({
                    "msg": "Email Updated",
                });
            }).catch((err: FirebaseError) => {
                console.log(err);
                let msg = err.message.split("/")[1]
                res.status(401).json({
                    "msg": msg,
                })
            });
    }
}