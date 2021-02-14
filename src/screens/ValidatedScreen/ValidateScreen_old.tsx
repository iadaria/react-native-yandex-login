import React from 'react';
import { Button, LayoutChangeEvent, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
// import validatejs from 'validate.js';
// import { validationDictionary } from './dictionary';
import { checkFormValidation, handleInputChange, setInputPosition } from './utils/validate-helpers';
import { IInputs, defaultInputs } from './constants/inputs';


export default function ValidateScreenOld() {
  const [inputs, setInputs] = React.useState<IInputs>(defaultInputs);
  const scrollView = React.createRef<ScrollView>();

  React.useEffect(() => {
    console.log('changed inputs', JSON.stringify(inputs, null, 4));
  }, [inputs]);
  // const result = validatejs({ password: 'lkj' }, validationDictionary);
  function renderError(id: keyof typeof inputs) {
    if (inputs[id].errorLabel) {
      return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
    }
    return null;
  }

  function submit() {
    const firstInvalidCoordinate: number | null = checkFormValidation(inputs, setInputs);

    if (firstInvalidCoordinate !== null) {
      scrollView.current?.scrollTo({
        x: 0,
        y: firstInvalidCoordinate,
        animated: true,
      });
      return;
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollView}>
        <View>
          <Text>Birthday month</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              handleInputChange({ id: 'birthday_month', value }, inputs, setInputs);
            }}
            onLayout={({ nativeEvent }: LayoutChangeEvent) => {
              setInputPosition(
                {
                  ids: ['birthday_month'],
                  value: nativeEvent.layout.y,
                },
                inputs,
                setInputs,
              );
            }}
          />
          {renderError('birthday_month')}

          <Text>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              handleInputChange({ id: 'password', value }, inputs, setInputs);
            }}
            onLayout={({ nativeEvent }: LayoutChangeEvent) => {
              setInputPosition(
                {
                  ids: ['password'],
                  value: nativeEvent.layout.y,
                },
                inputs,
                setInputs,
              );
            }}
          />
          {renderError('password')}
        </View>
        <Button color="green" title="Check all" onPress={submit} accessibilityLabel="HZ" />
      </ScrollView>
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
  split: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'grey',
    marginTop: 40,
  },
  button: {
    flex: 0,
    justifyContent: 'flex-end',
  },
  error: {
    // position: 'absolute',
    // bottom: 0,
    color: 'red',
    fontSize: 12,
  },
});
