import { Router } from "express";
import { TokenController } from "../controllers/token-controller";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";

import initializeLogger from "../logger";

const log = initializeLogger(__filename.split("\\").pop() || "");

const router = Router();

router.post(
	"/generate-access-token",
	...checkSchemaAndHandleErrors({
		id: { in: ["body"], isMongoId: true },
	}),
	TokenController.generateAccessToken
);

router.post(
	"/generate-refresh-token",
	...checkSchemaAndHandleErrors({
		id: { in: ["body"], isMongoId: true },
	}),
	TokenController.generateRefreshToken
);

router.post(
	"/decode-access-token",
	...checkSchemaAndHandleErrors({
		accessToken: { in: ["body"], isJWT: true },
	}),
	TokenController.decodeAccessToken
);

router.post(
	"/decode-refresh-token",
	...checkSchemaAndHandleErrors({
		refreshToken: { in: ["body"], isJWT: true },
	}),
	TokenController.decodeRefreshToken
);

export default router;
