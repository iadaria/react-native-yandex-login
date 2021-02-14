import React, { Fragment } from 'react';
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
}

export function TestTextInput(props: ITestInputProps): JSX.Element {
  const { error } = props;
  console.log('***** error', error);

  function renderError() {
    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }
    return null;
  }
  return (
    <>
      <TextInput {...props} />
      {renderError()}
    </>
  );
}

interface InputChangeProps {
  id: keyof typeof defaultInputs;
  value: string;
}

interface IProps {
  // children: typeof TestTextInput[] | Button[];
  children: IChild[] | IChild;
}

interface IChild extends JSX.Element, ITestInputProps {}

const ValidatedElements: React.FC<React.ReactNode> = ({ children }) => {
  const [inputs, setInputs] = React.useState<IInputs>(defaultInputs);
  const scrollView = React.createRef<ScrollView>();

  // React.useEffect(() => {
  //   console.log('changed inputs', JSON.stringify(inputs, null, 4));
  // }, [inputs]);

  function submit() {
    const firstInvalidCoordinate: number | null = handleAllValidate();

    if (firstInvalidCoordinate !== null) {
      scrollView.current?.scrollTo({
        x: 0,
        y: firstInvalidCoordinate,
        animated: true,
      });
      return;
    }
  }

  function handleAllValidate(): number | null {
    const updatedInputs = { ...inputs };
    for (const [key, input] of Object.entries(inputs)) {
      updatedInputs[key as keyof typeof inputs] = getValidatedInput({
        input,
        value: input.value,
      });
    }
    setInputs(updatedInputs);
    return getFirstInvalidInput();
  }

  function getFirstInvalidInput(): number | null {
    let firstInvalidCoordinate: number | null = Infinity;

    for (const [_, input] of Object.entries(inputs)) {
      if (input.errorLabel && input.yCoordinate < firstInvalidCoordinate!) {
        firstInvalidCoordinate = input.yCoordinate;
      }
    }

    if (firstInvalidCoordinate === Infinity) {
      firstInvalidCoordinate = null;
    }
    return firstInvalidCoordinate;
  }

  function setInputPosition({ ids, value }: { ids: [keyof typeof inputs]; value: number }) {
    const updatedInputs: IInputs = inputs; // don't need render interface

    ids.forEach((id: keyof typeof inputs) => {
      updatedInputs[id].yCoordinate = value;
    });

    setInputs(updatedInputs);
    // return getFirstInvalidInput({ inputs: updatedInputs });
  }

  function handleInputChange({ id, value }: InputChangeProps) {
    setInputs({
      ...inputs,
      [id]: getValidatedInput({
        input: inputs[id],
        value,
      }),
    });
  }

  return (
    <ScrollView ref={scrollView}>
      <View>
        <Text style={styles.header}>Birthday month</Text>
        {React.Children.map(children as IChild[], (child: IChild) => {
          const { id }: ITestInputProps = child.props;

          return React.cloneElement(child, {
            onChangeText: (value: string) => handleInputChange({ id, value }),

            error: inputs[id].errorLabel,

            onLayout: ({ nativeEvent }: LayoutChangeEvent) => {
              setInputPosition({ ids: [id], value: nativeEvent.layout.y });
            },
          });
        })}
        <Button color="green" title="Check all" onPress={submit} accessibilityLabel="HZ" />
      </View>
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
