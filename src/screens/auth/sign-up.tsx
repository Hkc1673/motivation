// SignUpScreen.js
import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('User registered successfully!', response.user.uid);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={text => setEmail(text)} />

      <Text>Password:</Text>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
