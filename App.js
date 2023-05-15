import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContextProvider} from './contexts/UserContext';
import RootStack from './screens/RootStack';
import {FileContextProvider} from './contexts/FileContext';

function App() {
  return (
    <UserContextProvider>
      <FileContextProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </FileContextProvider>
    </UserContextProvider>
  );
}

export default App;
