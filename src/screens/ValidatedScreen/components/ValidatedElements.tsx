import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TextProps,
  StyleSheet,
  LayoutChangeEvent,
  Button,
} from 'react-native';
import { defaultInputs, IInputs } from '../constants/inputs';
import { getValidatedInput } from '../utils/validate-helpers';

interface ITestInputProps extends TextProps {
  id: keyof typeof defaultInputs;
  error?: string;
  label?: string;
  touched?: boolean;
  onLayout?: (props: LayoutChangeEvent) => void;
}

export function TestTextInput(props: ITestInputProps): JSX.Element {
  const [isTouched, setIsTouched] = React.useState(false);

  React.useEffect(() => {
    console.log(
      `[TestInput/renderError] error='${props.error}, isTouched=${isTouched}, props.touched=${props.touched}'`,
    );
  }, [props, isTouched, props.touched]);

  function renderLabel() {
    const { label } = props;
    if (label) {
      return <Text>{label}</Text>;
    }
    return null;
  }

  function renderError() {
    const { error } = props;
    if (error && (isTouched || props.touched)) {
      return <Text style={styles.error}>{error}</Text>;
    }
    return null;
  }

  function handleBlur() {
    setIsTouched(!isTouched);
  }

  function handleFocus() {
    setIsTouched(false);
    // setIsFocused(true);
  }

  const { onLayout, ...others } = props;
  return (
    <View onLayout={onLayout}>
      {renderLabel()}
      <TextInput onBlur={handleBlur} onFocus={handleFocus} {...others} />
      {renderError()}
    </View>
  );
}

interface InputChangeProps {
  id: keyof typeof defaultInputs;
  value: string;
}

interface IChild extends JSX.Element, ITestInputProps {}

const ValidatedElements: React.FC<React.ReactNode> = ({ children }) => {
  const [inputs, setInputs] = React.useState<IInputs>(defaultInputs);
  const scrollView = React.useRef<ScrollView>(null);

  /*  React.useEffect(() => {
    console.log('changed inputs', JSON.stringify(inputs, null, 4));
  }, [inputs]); */

  function handleAllValidate(): IInputs {
    const updatedInputs = { ...inputs };
    for (const [key, input] of Object.entries(inputs)) {
      updatedInputs[key as keyof typeof inputs] = getValidatedInput({
        input,
        value: input.value,
        touched: true,
      });
    }
    setInputs(updatedInputs);
    return updatedInputs;
    // setInputs((prevInputs: IInputs) => ({ ...prevInputs, ...updatedInputs }));
  }

  function getFirstInvalidInput(validatedInputs: IInputs): number | null {
    let firstInvalidCoordinate: number = Infinity;

    for (const [_, input] of Object.entries(validatedInputs)) {
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
    const updatedInputs: IInputs = { ...inputs };

    ids.forEach((id: keyof typeof inputs) => {
      updatedInputs[id].yCoordinate = value;
    });

    setInputs(updatedInputs);
  }

  function handleInputChange({ id, value }: InputChangeProps) {
    setInputs({
      ...inputs,
      [id]: getValidatedInput({
        input: inputs[id],
        value,
        touched: false,
      }),
    });
  }

  function submit() {
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

  return (
    <ScrollView ref={scrollView}>
      <Text style={styles.header}>Form</Text>
      {React.Children.map(children as IChild[], (child: IChild) => {
        if (child.type.displayName === 'TestTextInput') {
          const { id }: ITestInputProps = child.props;
          return React.cloneElement(child, {
            onChangeText: (value: string) => handleInputChange({ id, value }),
            error: inputs[id].errorLabel,
            onLayout: ({ nativeEvent }: LayoutChangeEvent) => {
              setInputPosition({ ids: [id], value: nativeEvent.layout.y });
            },
            touched: Boolean(inputs[id].touched),
          });
        }
        return child;
      })}
      <Button color="green" title="Check all" onPress={() => submit()} accessibilityLabel="HZ" />
    </ScrollView>
  );
};

export default ValidatedElements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 50,
    paddingBottom: 10,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});
