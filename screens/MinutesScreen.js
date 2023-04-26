import React from 'react';
import {Button, Text, View} from 'react-native';

const MinutesScreen = ({navigation}) => {
  return (
    <View>
      <Text>Hello! This is Minutes Screen</Text>
      <Button
        title="Go Setting Screen"
        onPress={() => navigation.navigate('SettingOption')}
      />
    </View>
  );
};

export default MinutesScreen;
