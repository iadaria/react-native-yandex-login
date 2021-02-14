import { validationDictionary } from '../dictionary';
import validatejs from 'validate.js';
import { IInput /* , IInputs, defaultInputs */ } from '../constants/inputs';

/* interface IValidateInputProps {
  type: keyof typeof validationDictionary;
  value: string;
} */

/******************* Helpers for validate  element ****************** */
export function validateInput({ type, value }: IInput) {
  const result = validatejs(
    {
      [type]: value,
    },
    {
      [type]: validationDictionary[type],
    },
  );

  if (result) {
    return result[type][0];
  }

  return null;
}

interface InputValidationStateProps {
  input: IInput;
  value: string;
}

export function getValidatedInput({ input, value }: InputValidationStateProps): IInput {
  return {
    ...input,
    value,
    errorLabel: input?.optional ? null : validateInput({ type: input.type, value }),
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* export function checkFormValidation(
  inputs: IInputs,
  setInputs: (inputs: IInputs) => void,
): number | null {
  const updatedInputs = { ...inputs };
  for (const [key, input] of Object.entries(inputs)) {
    updatedInputs[key as keyof typeof inputs] = getInputValidationState({
      input,
      value: input.value,
    });
  }
  setInputs(updatedInputs);

  return getFirstInvalidInput({ inputs: updatedInputs });
} */

/* export function setInputPosition(
  { ids, value }: { ids: [keyof typeof inputs]; value: number },
  inputs: IInputs,
  setInputs: (inputs: IInputs) => void,
): void {
  const updatedInputs: IInputs = inputs; // don't need render interface

  ids.forEach((id: keyof typeof inputs) => {
    updatedInputs[id].yCoordinate = value;
  });

  setInputs(updatedInputs);
} */

/* interface IInputHandlProps {
  id: keyof typeof defaultInputs;
  value: string;
  cb: () => void;
}

export function handleInputChange(
  { id, value, cb = () => {} }: IInputHandlProps,
  inputs: IInputs,
  setInputs: (inputs: IInputs) => void,
) {
  setInputs({
    ...inputs,
    [id]: getInputValidationState({
      input: inputs[id],
      value,
    }),
  });
} */

/* export function getFirstInvalidInput({ inputs }: { inputs: IInputs }): number | null {
  let firstInvalidCoordinate: number | null = Infinity;

  // for(const [key, input] of Object.entries(inputs)) {
  for (const [_, input] of Object.entries(inputs)) {
    if (input.errorLabel && input.yCoordinate < firstInvalidCoordinate!) {
      firstInvalidCoordinate = input.yCoordinate;
    }
  }

  if (firstInvalidCoordinate === Infinity) {
    firstInvalidCoordinate = null;
  }
  return firstInvalidCoordinate;
} */
