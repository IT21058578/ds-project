import { Router } from "express";

import { UserController } from "../controllers/user-controller";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";

const router = Router();

router.get(
	"/:id",
	...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
	UserController.getUser
);

// FIXME: Proper validation for all user shit

router.get("/", UserController.getUsers);

// TODO: Only specific information can be changed through this route. No roles, ids and etc.
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
