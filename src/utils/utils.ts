import * as bcrypt from 'bcrypt';

/**
 * Encrypt a password using bcrypt, if no password is passed a random one will be generated
 * @param password
 * @param saltOrRounds
 * @returns
 */
export const hashPassword = async (
  password: string = `${Math.random() * 1000}`,
  saltOrRounds: number = 10,
) => {
  return await bcrypt.hash(password, saltOrRounds);
};
