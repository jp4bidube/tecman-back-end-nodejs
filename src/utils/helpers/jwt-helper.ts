import { JwtPayload, VerifyErrors } from "jsonwebtoken";

export type IJwt = VerifyErrors | string | JwtPayload | undefined;

function checkWithError(verifiedtoken: IJwt): verifiedtoken is VerifyErrors {
  if (
    (verifiedtoken as VerifyErrors).name === "JsonWebTokenError" ||
    (verifiedtoken as VerifyErrors).name === "TokenExpiredError"
  ) {
    return true;
  }
  return false;
}

export { checkWithError };
