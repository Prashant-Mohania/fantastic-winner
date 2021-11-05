import { Request, Response } from "express";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  updateEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseError, initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase_config";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../db/repos/user_repo";

const app = initializeApp(firebaseConfig);

export class AuthController {

  // Creating the User with Email and Password using Firebase Auth
  static async signUp(req: Request, res: Response) {
    const { user_email, user_password } = req.body;
    console.log(req.body);
    let auth = getAuth();

    await createUserWithEmailAndPassword(auth, user_email, user_password)
      .then((val) => {
        res.status(200).json({
          auth: true,
          msg: "Success! User Created",
        });
      })
      .catch((err: FirebaseError) => {
        let msg = err.message.split("/")[1];
        res.status(401).json({
          auth: false,
          msg: msg.substring(0, msg.length - 2),
        });
      });
  }

  // Sign the User with Email and Password using Firebase Auth
  static async signIn(req: Request, res: Response) {
    let { user_email, user_password } = req.body;
    console.log(req.body);
    let auth = getAuth();

    await signInWithEmailAndPassword(auth, user_email, user_password)
      .then((val) => {
        res.status(200).json({
          auth: true,
          msg: "Success! User Signed In",
        });
        global.localStorage.setItem("user", JSON.stringify(val.user));
      })
      .catch((err: FirebaseError) => {
        let msg = err.message.split("/")[1];
        res.status(401).json({
          auth: false,
          msg: msg.substring(0, msg.length - 2),
        });
      });
  }

  // Update the User's Email using Firebase Auth
  static async updateEmail(req: Request, res: Response) {
    let { user_email } = req.body;
    let auth = getAuth();
    await updateEmail(auth.currentUser?.getIdToken() ?? JSON.parse("{}"), user_email)
      .then(() => {
        res.status(200).json({
          msg: "Success! Email updated",
        });
      })
      .catch((err: FirebaseError) => {
        let msg = err.message.split("/")[1];
        // res.status(401).json({
        //   msg: msg.substring(0, msg.length - 2),
        // });
        res.send(err.message);
      });
  }

  // Change the User's Password when User is logged in, using Firebase Auth
  static async changePass(req: Request, res: Response) {
    let { user_password } = req.body;

    await updatePassword(
      JSON.parse(global.localStorage.getItem("user") || "{}"),
      user_password
    )
      .then((val) => {
        res.status(200).json({
          msg: "Success! Password changed",
        });
      })
      .catch((err: FirebaseError) => {
        let msg = err.message.split("/")[1];
        res.status(401).json({
          msg: msg.substring(0, msg.length - 2),
        });
      });
  }

  // Sending the Password reset email using Firebase Auth
  static async forgotPass(req: Request, res: Response) {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, auth.currentUser?.email ?? "")
      .then(() => {
        res.status(200).json({
          msg: "Success! Verification Email Send",
        });
      })
      .catch((err: FirebaseError) => {
        let msg = err.message.split("/")[1];
        res.status(401).json({
          msg: msg.substring(0, msg.length - 2),
        });
      });
  }
}

