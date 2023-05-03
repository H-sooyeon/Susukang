import React from 'react';
import {Button, Text, View, StatusBar} from 'react-native';

const MinutesScreen = ({route, navigation}) => {
  return (
    <View>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Button
        title="Go Setting Screen"
        onPress={() => navigation.navigate('SettingOption')}
      />
      <Text>Hello! This is Minutes Screen</Text>
      <Text>Your UserId = {route.params.uid}</Text>
    </View>
  );
};

export default MinutesScreen;
