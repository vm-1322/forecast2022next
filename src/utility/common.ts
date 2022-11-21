import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
}

export async function checkPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export const isEmailValid = (email: string): boolean => {
  if (!email) return false;

  if (email.length > 254) return false;

  const valid = emailRegex.test(email);

  if (!valid) return false;

  const parts = email.split('@');

  if (parts[0].length > 64) return false;

  const domainParts = parts[1].split('.');

  if (domainParts.some((part) => part.length > 63)) return false;

  return true;
};

export const isPasswordValid = (
  password: string,
  length: number = 5
): boolean => {
  if (!password) return false;

  if (password.length > length) return false;

  return true;
};
