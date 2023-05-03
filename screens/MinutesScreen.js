import React from 'react';
import {Button, Text, View, StatusBar, StyleSheet} from 'react-native';
import Minute from '../components/Minute';
import Empty from '../components/Empty';

const MinutesScreen = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Button
        title="옵션으로"
        onPress={() => navigation.navigate('SettingOption')}
      />
      <Empty />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default MinutesScreen;
