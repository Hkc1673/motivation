import React from 'react';
import Update from './update';
import Feed from './feed';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const HomeScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Update" component={Update} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
