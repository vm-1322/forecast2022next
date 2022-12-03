import { hash, compare } from 'bcryptjs';
import { IMatch, Stages, Rounds, DateTime } from 'types';

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

export const isValidEmail = (email: string): boolean => {
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

export const isValidPassword = (
  password: string,
  length: number = 5
): boolean => {
  if (!password) return false;

  if (password.length > length) return false;

  return true;
};

export const FormatDateTime = (
  moment: number,
  format: DateTime = DateTime.DateTime
) => {
  const date = new Date(moment).toString();

  if (DateTime[format] === DateTime.DateTime)
    return `${date.substring(8, 10)} ${date.substring(4, 7)},  ${date.substring(
      15,
      21
    )}`;

  if (DateTime[format] === DateTime.Date)
    return `${date.substring(8, 10)} ${date.substring(4, 7)}`;

  if (DateTime[format] === DateTime.Time) return `${date.substring(15, 21)}`;
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
    curStage += `${Rounds[stage.groupRound]}`;
  }

  return curStage;
};

/*
 * String
 */

export const rightString = (str: string, num: number): string => {
  return str.slice(-num);
};

/*
 * Date
 */

export const timeStampToDate = (timeStamp: number): string => {
  const curDate = new Date(timeStamp);
  const curYear = curDate.getFullYear();
  const curMonth = rightString('0' + (curDate.getMonth() + 1), 2);
  const curDay = rightString('0' + curDate.getDate(), 2);
  const curHour = rightString('0' + curDate.getHours(), 2);
  const curMin = rightString('0' + curDate.getMinutes(), 2);

  return `${curYear}-${curMonth}-${curDay}T${curHour}:${curMin}`;
};
