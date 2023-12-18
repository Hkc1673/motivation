import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {isMountedRef, navigationRef} from '@core/root-methods/root-navigation';
import auth from '@react-native-firebase/auth';
import SignIn from '../auth/sign-in';
import SignUp from '../auth/sign-up';
import Home from '../in-app/home';
import Create from '../in-app/create';
import Settings from '../in-app/settings';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
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
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color, size}) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Create"
            component={Create}
            options={{
              tabBarLabel: 'Create',
              tabBarIcon: ({color, size}) => (
                <Icon name="plus" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({color, size}) => (
                <Icon name="cog" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
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
