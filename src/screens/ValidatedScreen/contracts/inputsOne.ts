import { IInput } from './input';

export const defaultInputs: IInputsOne = {
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

export interface IInputsOne {
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

/* export interface IInputsOne {
  first_name: IInput<IInputsOne>;
  last_name: IInput<IInputsOne>;
  birthday_month: IInput<IInputsOne>;
  birthday_day: IInput<IInputsOne>;
  birthday_year: IInput<IInputsOne>;
  state: IInput<IInputsOne>;
  zip: IInput<IInputsOne>;
  tos: IInput<IInputsOne>;
  password: IInput<IInputsOne>;
} */
