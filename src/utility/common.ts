import { hash, compare } from 'bcryptjs';
import { IMatch, Stages, Rounds } from '../types';

/*
 * Password
 */

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
}

export async function checkPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

/*
 * isValid
 */

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

export const FormatDateTime = (moment: number) => {
  const date = new Date(moment).toString();

  return `${date.substring(8, 10)} ${date.substring(4, 7)},  ${date.substring(
    15,
    21
  )}`;
};

export const getSage = (match: IMatch) => {
  const stage = match.stage;
  let curStage = '';

  if (Stages[stage.kind] === Stages.GS) {
    curStage += `Group ${stage.groupRound}`;

    if (stage.round) {
      curStage += ` - Round ${stage.round}`;
    }
  } else {
    curStage += `${stage.groupRound} ${Rounds[stage.kind]}`;
  }

  return curStage;
};
