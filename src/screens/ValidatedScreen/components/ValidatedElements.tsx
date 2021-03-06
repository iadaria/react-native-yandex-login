import React from 'react';
import { ScrollView, LayoutChangeEvent } from 'react-native';
import { getValidatedInput } from '../utils/validate-helpers';
import { ITestInputProps } from './TestTextInput';
import { IInput } from '../contracts/input';

/* interface InputChangeProps {
  id: keyof typeof defaultInputs;
  value: string;
} */
interface IChild<T> extends JSX.Element, ITestInputProps<T> {}

// interface ValidatedElementsProps<T extends { [key: string]: IInput }> {
//   defaultInputs: T;
// }

// type PropsWhithChildren<P> = P & { children?: React.ReactNode };

/* function ValidatedElements<T extends { [key: string]: IInput }>({
  children,
  defaultInputs,
}: {
  children?: React.ReactNode;
  defaultInputs: T;
}) { */
function ValidatedElements<T extends { [key: string]: IInput }>({
  children,
  defaultInputs,
}: {
  children?: React.ReactNode;
  defaultInputs: T;
}) {
  const [inputs, setInputs] = React.useState<T>(defaultInputs);
  const scrollView = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    console.log('changed inputs', JSON.stringify(inputs, null, 4));
  }, [inputs]);

  function handleAllValidate(): T /* IInputs */ {
    console.log('[handleAllValidate]');
    const updatedInputs = { ...inputs };
    for (const [key, input] of Object.entries(inputs)) {
      updatedInputs[key as keyof typeof inputs] = getValidatedInput({
        input,
        value: input.value.toString(),
        touched: true,
      }) as T[keyof T];
    }
    setInputs(updatedInputs);
    return updatedInputs;
  }

  function getFirstInvalidInput(validatedInputs: T /* IInputs */): number | null {
    let firstInvalidCoordinate: number = Infinity;

    for (const input of Object.values(validatedInputs)) {
      if (input.errorLabel && input.yCoordinate && input.yCoordinate < firstInvalidCoordinate!) {
        firstInvalidCoordinate = input.yCoordinate;
      }
    }

    if (firstInvalidCoordinate === Infinity) {
      return null;
    }

    return Math.trunc(firstInvalidCoordinate);
  }

  function setInputPosition({ ids, value }: { ids: [keyof typeof inputs]; value: number }) {
    const updatedInputs: T /* IInputs  */ = { ...inputs };

    ids.forEach((id: keyof typeof inputs) => {
      updatedInputs[id].yCoordinate = value;
    });

    setInputs(updatedInputs);
  }

  function handleInputChange({ id, value }: { id: keyof typeof defaultInputs; value: string }) {
    setInputs({
      ...inputs,
      [id]: getValidatedInput({
        input: inputs[id],
        value,
        touched: false,
      }),
    });
  }

  function handleSubmit() {
    let firstInvalidCoordinate: number | null = null;
    const updatedInputs = handleAllValidate();
    firstInvalidCoordinate = getFirstInvalidInput(updatedInputs);

    if (firstInvalidCoordinate !== null) {
      scrollView.current?.scrollTo({
        x: 0,
        y: firstInvalidCoordinate,
        animated: true,
      });
    }
  }

  const isTextInput = (child: IChild<T>) => child.type.name === 'TestTextInput';
  const isButton = (child: IChild<T>) => child.type.name === 'Button';

  function renderChildren(): React.ReactNode {
    return React.Children.map(children as IChild<T>[], (child: IChild<T>) => {
      if (isTextInput(child)) {
        const { id }: ITestInputProps<T> = child.props;
        return React.cloneElement(child, {
          onChangeText: (value: string) => handleInputChange({ id, value }),
          onLayout: ({ nativeEvent }: LayoutChangeEvent) => {
            setInputPosition({ ids: [id], value: nativeEvent.layout.y });
          },
          error: inputs[id].errorLabel,
          touched: Boolean(inputs[id].touched),
        });
      } else if (isButton(child)) {
        const { onPress } = child.props;
        return React.cloneElement(child, {
          onPress: () => {
            handleSubmit();
            onPress();
          },
        });
      }
      return child;
    });
  }

  return <ScrollView ref={scrollView}>{renderChildren()}</ScrollView>;
}

export default ValidatedElements;
