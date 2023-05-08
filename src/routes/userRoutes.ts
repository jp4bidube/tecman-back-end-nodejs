import { Request, Response, Router } from "express";
import { createUserController, authenticateUserController, refreshTokenUserController } from "@useCases/user";
import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";

const userRouter = Router();

userRouter.post(
  "/users",
  ensureAuthenticated,
  (request: Request, response: Response) =>
    createUserController.handle(request, response)
);
userRouter.post("/users/signin", (request: Request, response: Response) =>
  authenticateUserController.handle(request, response)
);

userRouter.get("/users/refresh/:refresh_token", (request: Request, response: Response) =>
refreshTokenUserController.handle(request, response)
);

export { userRouter };
