import React from 'react';
import {Button, Text, View, StatusBar} from 'react-native';

const MinutesScreen = ({navigation}) => {
  return (
    <View>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Text>Hello! This is Minutes Screen</Text>
      <Button
        title="Go Setting Screen"
        onPress={() => navigation.navigate('SettingOption')}
      />
    </View>
  );
};

export default MinutesScreen;
