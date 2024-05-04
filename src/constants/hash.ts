interface HashOptions {
  algorithm: "argon2id" | "argon2d" | "argon2i";
  memoryCost?: number;
  timeCost?: number;
}

export const PASSWORD_HASH_OPTIONS: HashOptions = {
  algorithm: "argon2id",
  memoryCost: 2 ** 16,
  timeCost: 3,
};
