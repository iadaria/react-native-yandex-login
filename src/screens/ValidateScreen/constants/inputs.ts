import { validationDictionary } from '../dictionary';

export const defaultInputs: IInputs = {
  first_name: {
    type: 'generic',
    value: '',
  },
  last_name: {
    type: 'generic',
    value: '',
  },
  birthday_month: {
    type: 'month',
    value: '',
  },
  password: {
    type: 'password',
    value: '',
  },
  birthday_day: {
    type: 'day',
    value: '',
  },
  birthday_year: {
    type: 'year',
    value: '',
  },
  state: {
    type: 'state',
    value: '',
  },
  zip: {
    type: 'zip',
    value: '',
  },
  tos: {
    type: 'bool',
    value: false,
  },
};

export interface IInput {
  type: string & keyof typeof validationDictionary;
  value: string | boolean;
  errorLabel?: string;
  optional?: boolean;
  yCoordinate?: number;
  touched?: boolean;
}

export interface IInputs {
  first_name: IInput;
  last_name: IInput;
  birthday_month: IInput;
  birthday_day: IInput;
  birthday_year: IInput;
  state: IInput;
  zip: IInput;
  tos: IInput;
  password: IInput;
}
