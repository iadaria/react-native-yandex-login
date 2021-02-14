import React, { Fragment } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface IFormInputProps {
  errorLabel?: string | null;
  label?: string;
  touched?: boolean;
}

function One() {
  const hello = 'hellow';
}

export default function FormInput<T extends typeof One>(props: any) {
  const [_touched, setTouched] = React.useState(false);
  const { errorLabel, label, touched }: IFormInputProps = props;

  console.log(hellow);

  function renderError() {
    if (errorLabel && (_touched || touched)) {
      return (
        <View>
          <Text style={styles.error}>{errorLabel}</Text>
        </View>
      );
    }
    return null;
  }

  function onBlur() {
    setTouched(true);
  }

  return (
    <Fragment>
      <Text>{label}</Text>
      <TextInput style={styles.input} onBlur={onBlur} {...props} />
      {renderError()}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 15,
    alignSelf: 'stretch',
  },
  error: {
    position: 'absolute',
    bottom: 0,
    color: 'red',
    fontSize: 12,
  },
});
