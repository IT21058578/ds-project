import { Router } from "express";
import { CustomValidator } from "express-validator";
import { TokenController } from "../controllers/token-controller";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";
import { hasValidRoles } from "../utils";

const router = Router();

router.post(
	"/generate-access-token",
	...checkSchemaAndHandleErrors({
		id: { in: ["body"], isMongoId: true },
		roles: { in: ["body"], custom: { options: hasValidRoles } },
	}),
	TokenController.generateAccessToken
);

router.post(
	"/generate-refresh-token",
	...checkSchemaAndHandleErrors({
		id: { in: ["body"], isMongoId: true },
		roles: { in: ["body"], custom: { options: hasValidRoles } },
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
