import { v4, validate } from 'uuid';

export const generateUUID = (): string => {
  return v4();
}

export const isValidUUID = (uuid: string): boolean => {
  return validate(uuid);
}
