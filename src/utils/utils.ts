import * as bcrypt from 'bcrypt';

/**
 * Encrypt a password using bcrypt, if no password is passed a random one will be generated
 * @param password
 * @param saltOrRounds
 * @returns
 */
export const hashPassword = async (
  password: string,
  saltOrRounds: number = 10,
) => {
  return await bcrypt.hash(password, saltOrRounds);
};

/**
 * Generate random password
 * @param password
 * @param saltOrRounds
 * @returns
 */
export const generatePassword = (password?: string) => {
  const randomNumber = password || Math.random().toString(16);

  return randomNumber.substring(2, randomNumber.length);
};
