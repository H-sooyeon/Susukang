import React from 'react';
import {useUserContext} from '../contexts/UserContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import SignInScreen from './SignInScreen';
import TranslationSettingsScreen from './TranslationSettingsScreen';
import MinutesScreen from './MinutesScreen';
import ChattingScreen from './ChattingScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const {user} = useUserContext();
  return (
    // initialRouteName="SignIn"
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
        </>
      )}
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
  );
};

export default RootStack;
