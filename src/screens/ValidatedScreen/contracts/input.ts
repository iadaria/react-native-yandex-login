import { validationDictionary } from '../dictionary';

export interface IInput {
  type: string & keyof typeof validationDictionary;
  value: string | boolean;
  errorLabel?: string;
  optional?: boolean;
  yCoordinate?: number;
  touched?: boolean;
}
