import { Router } from "express";

import * as loginController from "../controllers/loginController";
import * as homeController from "../controllers/homeController";

const router = Router();

router.get('/', homeController.home);

router.get('/login', loginController.loginGet);
router.post('/login', loginController.loginPost);

router.get('/cadastro', loginController.cadastroGet);
router.post('/cadastro', loginController.cadastroPost);


export default router;