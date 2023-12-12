// SignInScreen.js
import React, {useState} from 'react';
import {SafeAreaView, Text, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

// @ts-ignore
const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      console.log('User signed in successfully!', response.user.uid);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <SafeAreaView>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={text => setEmail(text)} />

      <Text>Password:</Text>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </SafeAreaView>
  );
};

export default SignInScreen;
