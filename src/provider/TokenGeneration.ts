import { User } from "@prisma/client";
import { UnauthorizedError } from "@utils/errors/apiErrors";
import { IJwt, checkWithError } from "@utils/helpers/jwt-helper";
import { JwtPayload, sign, verify } from "jsonwebtoken";

type TOKEN_TYPE = "ACCESS_TOKEN" | "REFRESH_TOKEN";

class TokenGeneration {
  async execute(user: User) {
    const token = sign(
      {
        username: user.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        subject: user.id.toString(),
        expiresIn: "20s",
      }
    );

    const refreshToken = sign(
      {
        username: user.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        subject: user.id.toString(),
        expiresIn: "300s",
      }
    );

    return {
      access_token: token,
      token_type: "Bearer",
      refresh_token: refreshToken,
    };
  }

  verifyToken(token: string, tokenType: TOKEN_TYPE) {
    const secret =
      tokenType === "ACCESS_TOKEN"
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET;

    const verifiedtoken = verify(token, secret, (error, decoded) => {
      if (error) {
        return error;
      }
      return decoded;
    }) as IJwt;

    if (checkWithError(verifiedtoken)) {
      throw new UnauthorizedError(verifiedtoken.message);
    }

    return verifiedtoken as JwtPayload;
  }
}

export { TokenGeneration };
