import React from 'react';
import TranslationSettingsScreen from './screens/TranslationSettingsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MinutesScreen from './screens/MinutesScreen';
import ChattingScreen from './screens/ChattingScreen';
import SignInScreen from './screens/SignInScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SettingOption"
            component={TranslationSettingsScreen}
            options={{
              title: '옵션',
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
    </SafeAreaProvider>
  );
}

export default App;
