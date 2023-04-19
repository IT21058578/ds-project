import { Router } from "express";

import { UserController } from "../controllers/user-controller";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";

import initializeLogger from "../logger";

const log = initializeLogger(__filename.split("\\").pop() || "");

const router = Router();

router.get(
	"/:id",
	...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
	UserController.getUser
);

router.get("/", UserController.getUsers);

router.patch(
	"/:id",
	...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
	UserController.editUser
);

router.delete(
	"/:id",
	...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
	UserController.deleteUser
);

export default router;
