import React from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';

const data = [
  {
    title: '스마트물류 프로젝트 오티',
    department: '소프트웨어공학과',
    date: '2023.04.05',
  },
  {
    title: '카카오테크캠퍼스',
    department: '카카오',
    date: '2023.04.10',
  },
];

const Minute = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.description}>저장된 회의록이 없습니다.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    alignItems: 'center',
  },
});

export default Minute;
