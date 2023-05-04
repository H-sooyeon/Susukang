import React, {useState} from 'react';
import {View, StatusBar, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Empty from '../components/Empty';
import MinuteList from '../components/MinuteList';
import AddMinue from '../components/AddMinute';

const MinutesScreen = ({navigation}) => {
  const [datas, setDatas] = useState([
    {
      id: 1,
      title: '스마트물류 프로젝트 오티',
      department: '소프트웨어공학과',
      date: '2023.4.5',
    },
    {
      id: 2,
      title: '카카오테크캠퍼스',
      department: '카카오',
      date: '2023.4.10',
    },
  ]);

  const today = new Date();

  const getDate = today => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const date = `${year}.${month}.${day}`;

    return date;
  };

  const onRemove = id => {
    const nextDatas = datas.filter(data => data.id !== id);
    setDatas(nextDatas);

    // 서버에 삭제한 문서 전달하는 코드 추가
  };

  const onInsert = inputTitle => {
    const nextId =
      datas.length > 0 ? Math.max(...datas.map(data => data.id)) + 1 : 1;

    const data = {
      id: nextId,
      title: inputTitle,
      department: '소속',
      date: getDate(today),
    };

    setDatas(datas.concat(data));
    // 서버에 추가한 문서 전달하는 코드 추가
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      {datas.length === 0 ? (
        <Empty />
      ) : (
        <MinuteList datas={datas} onRemove={onRemove} />
      )}
      <KeyboardAvoidingView>
        <AddMinue style={{flex: 1}} onInsert={onInsert} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    margin: 5,
  },
  box: {
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
  },
  itemButton: {
    flex: 1,
  },
});

export default MinutesScreen;
