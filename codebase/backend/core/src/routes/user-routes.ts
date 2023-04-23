import { Router } from "express";

import { UserController } from "../controllers/user-controller";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";

import initializeLogger from "../logger";

const router = Router();

router.post(
	"/search",
	...checkSchemaAndHandleErrors({
		pageSize: { isInt: true, optional: true },
		pageNum: { isInt: true, optional: true },
		sortCol: { isString: true, optional: true },
		sortDir: { isString: true, optional: true },
		search: { isString: true, optional: true },
	}),
	UserController.searchUsers
);

router
	.route("/:id")
	.get(
		...checkSchemaAndHandleErrors({
			id: { in: ["params"], isMongoId: true },
		}),
		UserController.getUser
	)
	.put(
		...checkSchemaAndHandleErrors({
			id: { in: ["params"], isMongoId: true },
			brandName: { isString: true, optional: true },
			firstName: { isString: true, optional: true },
			lastName: { isString: true, optional: true },
			profileImageUrl: { isURL: true, optional: true },
		}),
		UserController.editUser
	)
	.delete(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		UserController.deleteUser
	);

export default router;
