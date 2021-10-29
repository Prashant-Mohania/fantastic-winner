import express, { Router, Request, Response } from "express";
import { UserController } from "../db/controller/user_controller";

import firebase from 'firebase/auth';
import 'firebase/auth';
import { firebaseConfig } from "../config";

const router = Router();

router.get("/", (req, res) => {
    res.send("API is working");
});

// router.post("/signup", UserController.createUser);

router.post("/signup", async (req: Request, res: Response) => {
    let { email, password } = req.body;
    console.log(email);
    let auth = firebase.getAuth();
    await firebase.createUserWithEmailAndPassword(auth, email, password).then((val) => {
        console.log(val.user.email);
        res.send({
            "auth": true,
            "msg": "Succesfully user created",
        })
    }).catch((err) => {
        console.log(err);
        res.send({
            "auth": false,
            "msg": "something went wrong try again!!!"
        });
    });
});

export { router };