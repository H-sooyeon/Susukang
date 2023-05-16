import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContextProvider} from './contexts/UserContext';
import RootStack from './screens/RootStack';
import {FileContextProvider} from './contexts/FileContext';
import {SettingContextProvider} from './contexts/SettingContext';
import {SearchContextProvider} from './contexts/SearchContext';
import {ScheduleContextProvider} from './contexts/ScheduleContext';

function App() {
  return (
    <UserContextProvider>
      <SearchContextProvider>
        <ScheduleContextProvider>
          <FileContextProvider>
            <SettingContextProvider>
              <NavigationContainer>
                <RootStack />
              </NavigationContainer>
            </SettingContextProvider>
          </FileContextProvider>
        </ScheduleContextProvider>
      </SearchContextProvider>
    </UserContextProvider>
  );
}

export default App;
