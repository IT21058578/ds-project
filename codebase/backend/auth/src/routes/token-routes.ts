import { Router } from "express";
import { CustomValidator } from "express-validator";
import { TokenController } from "../controllers/token-controller";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";
import { hasValidRoles } from "../utils";

const router = Router();

// FIXME: Validate roles

router.post(
	"/generate-access-token",
	...checkSchemaAndHandleErrors({
		id: { isMongoId: true },
		roles: { custom: { options: hasValidRoles } },
	}),
	TokenController.generateAccessToken
);

router.post(
	"/generate-refresh-token",
	...checkSchemaAndHandleErrors({
		id: { isMongoId: true },
		roles: { custom: { options: hasValidRoles } },
	}),
	TokenController.generateRefreshToken
);

router.post(
	"/decode-access-token",
	...checkSchemaAndHandleErrors({
		accessToken: { isJWT: true },
	}),
	TokenController.decodeAccessToken
);

router.post(
	"/decode-refresh-token",
	...checkSchemaAndHandleErrors({
		refreshToken: { isJWT: true },
	}),
	TokenController.decodeRefreshToken
);

export default router;
