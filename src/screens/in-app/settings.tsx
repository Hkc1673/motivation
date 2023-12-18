import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Button, Toast} from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Settings = () => {
  return (
    <SafeAreaView>
      <Button onPress={() => Toast.info('This is a toast tips')}>
        <Text>Toast</Text>
      </Button>
      <Icon name={'rocket'} size={30} color={'#900'} />
    </SafeAreaView>
  );
};

export default Settings;
