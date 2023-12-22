import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Button, Toast} from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
const Settings = () => {
  return (
    <SafeAreaView>
      <Button onPress={() => Toast.info('This is a toast tips')}>
        <Text>Toast</Text>
      </Button>
      <Icon name={'rocket'} size={30} color={'#900'} />
      <Button onPress={() => auth().signOut()}>
        <Text>Sign Out</Text>
      </Button>
    </SafeAreaView>
  );
};

export default Settings;
