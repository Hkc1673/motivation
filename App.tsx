import React from 'react';
import Router from '@screens/router';
import {Provider} from '@ant-design/react-native';

function App(): JSX.Element {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
