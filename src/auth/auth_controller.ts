import { Request, Response } from "express";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError, initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase_config";

const app = initializeApp(firebaseConfig);

export class AuthController {
  static async signUp(req: Request, res: Response) {
    let { user_email, user_password } = req.body;
    console.log(req.body);
    let auth = getAuth();

    await createUserWithEmailAndPassword(auth, user_email, user_password)
      .then((val) => {
        res.status(200).json({
          auth: true,
          msg: "Success",
        });
      })
      .catch((err: FirebaseError) => {
        let msg = err.message.split("/")[1];
        res.status(401).json({
          auth: false,
          msg: msg.slice(0, msg.length - 2),
        });
      });
  }

  static async signIn(req: Request, res: Response) {
    let { user_email, user_password } = req.body;
    console.log(req.body);
    let auth = getAuth();

    await signInWithEmailAndPassword(auth, user_email, user_password)
      .then((val) => {
        res.status(200).json({
          auth: true,
          msg: "Success",
        });
      })
      .catch((err: FirebaseError) => {
        let msg = err.message.split("/")[1];
        res.status(401).json({
          auth: false,
          msg: msg.slice(0, msg.length - 2),
        });
      });
  }
}
