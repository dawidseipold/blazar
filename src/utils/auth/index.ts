import { argon2id, hash, verify } from "argon2";

export const hashAndSaltPassword = async (password: string) => {
  return await hash(password);
};

export const verifyPassword = async (hash: string, password: string) => {
  return await verify(hash, password);
};
