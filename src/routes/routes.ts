import { getAuth } from "@firebase/auth";
import { Router } from "express";

import { AuthController } from "../auth/auth_controller";

import { TankController } from "../db/controller/tank_controller";
import { UserController } from "../db/controller/user_controller";
import { WaterSystemController } from "../db/controller/water_system_controller";

const router = Router();

router.get("/", (req, res) => {
  res.send("API is working");
});
const userID = getAuth().currentUser?.getIdToken();
router.post("/signUp", AuthController.signUp);
router.post("/signIn", AuthController.signIn);
router.post("/updateEmail", AuthController.updateEmail);
router.post("/forgotPass", AuthController.forgotPass);
router.post("/changePass", AuthController.changePass);
router.get(`/${userID}/`, UserController.userDetails);
router.get(`/${userID}/swm`, TankController.fetchTankDetails);
router.get(
  `/${userID}/waterSwitch`,
  WaterSystemController.fetchWaterSystemDetails
);

export { router };
