import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {isMountedRef, navigationRef} from '@core/root-methods/root-navigation';
import auth from '@react-native-firebase/auth';
import TabNavigator from './tabNavigator';
import SignIn from '../auth/sign-in';
import SignUp from '../auth/sign-up';

const Stack = createNativeStackNavigator();

const Router = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    auth().onAuthStateChanged(user => setUser(auth().currentUser));
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {user ? (
        <TabNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Router;
