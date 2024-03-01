import { Router } from "express";
import { postLogin, postRegister } from "./controller/auth.controller";
import { getHome } from "./controller/home.controller";
const router = Router();

router.route("/auth/register").post(postRegister);
router.route("/auth/login").post(postLogin);

router.route("/").get(getHome);

export default router;
