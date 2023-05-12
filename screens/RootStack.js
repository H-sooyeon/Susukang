import React from 'react';
import {useUserContext} from '../contexts/UserContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import SignInScreen from './SignInScreen';
import TranslationSettingsScreen from './TranslationSettingsScreen';
import ChattingScreen from './ChattingScreen';
import MainTabScreen from './MainTabScreen';
import OpenMinute from './OpenMinute';

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
        name="MainTabScreen"
        component={MainTabScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingOption"
        component={TranslationSettingsScreen}
        options={{
          title: '옵션',
          headerTitleAlign: 'center',
        }}
        style={{flex: 1}}
      />
      <Stack.Screen
        name="Chatting"
        component={ChattingScreen}
        options={{
          title: '대화 번역',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="openFile"
        component={OpenMinute}
        options={{
          title: '문서',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
