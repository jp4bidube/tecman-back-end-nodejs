import { createHash } from "node:crypto";
export const encrypt = (inputValue: string) => {
  const buf = Buffer.from(inputValue, "base64");
  const hash = createHash("sha256", buf);
  hash.update(inputValue.toString());
  
  return Array.from(hash.digest(), function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('-').toUpperCase()
};
