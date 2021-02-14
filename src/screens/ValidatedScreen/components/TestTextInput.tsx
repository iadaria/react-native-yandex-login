import React from 'react';
import { LayoutChangeEvent, StyleSheet, Text, TextInput, TextProps, View } from 'react-native';
import { defaultInputs } from '../constants/inputs';

export interface ITestInputProps extends TextProps {
  id: keyof typeof defaultInputs;
  error?: string;
  label?: string;
  touched?: boolean;
  onLayout?: (props: LayoutChangeEvent) => void;
}

export function TestTextInput(props: ITestInputProps): JSX.Element {
  const [isTouched, setIsTouched] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    console.log(
      `[TestInput/useEffect] id=${props.id} error='${props.error}, isTouched=${isTouched}, props.touched=${props.touched}, focused=${isFocused}'`,
    );
  }, [props, isTouched, props.touched, isFocused]);

  function renderLabel() {
    const { label } = props;
    if (label) {
      return <Text>{label}</Text>;
    }
    return null;
  }

  function renderError() {
    console.log(
      `[TestInput/renderError] id=${props.id} error='${props.error}, isTouched=${isTouched}, props.touched=${props.touched}'`,
    );
    const { error } = props;
    if (error && (isTouched || props.touched) && !isFocused) {
      return <Text style={styles.error}>{error}</Text>;
    }
    return null;
  }

  function handleBlur() {
    setIsTouched(!isTouched);
    setIsFocused(false);
  }

  function handleFocus() {
    setIsTouched(false);
    setIsFocused(true);
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
