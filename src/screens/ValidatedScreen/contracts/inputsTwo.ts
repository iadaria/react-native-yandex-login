import { IInput } from './input';

export const defaultInputsTwo: IInputsTwo = {
  first_name: {
    type: 'generic',
    value: '',
  },
  last_name: {
    type: 'generic',
    value: '',
  },
};

export interface IInputsTwo {
  first_name: IInput;
  last_name: IInput;
  [key: string]: IInput;
}
