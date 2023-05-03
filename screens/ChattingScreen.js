import React from 'react';
import {Text, View, StatusBar} from 'react-native';

const ChattingScreen = ({route, navigation}) => {
  return (
    <View>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Text>Hello! This is Chatting Screen</Text>
      <Text>selected language: {route.params.languageName}</Text>
      <Text>selected languageNumber: {route.params.languageNumber}</Text>
      <Text>selected category: {route.params.categoryName}</Text>
      <Text>selected categoryNumber: {route.params.categoryNumber}</Text>
    </View>
  );
};

export default ChattingScreen;
