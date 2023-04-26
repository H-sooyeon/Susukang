import React from 'react';
import TranslationSettingsScreen from './screens/TranslationSettingsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MinutesScreen from './screens/MinutesScreen';
import ChattingScreen from './screens/ChattingScreen';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Minutes">
        <Stack.Screen
          name="SettingOption"
          component={TranslationSettingsScreen}
          options={{
            title: '옵션 선택',
          }}
          style={{flex: 1}}
        />
        <Stack.Screen
          name="Minutes"
          component={MinutesScreen}
          options={{
            title: '회의록',
          }}
        />
        <Stack.Screen
          name="Chatting"
          component={ChattingScreen}
          options={{title: '번역'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
