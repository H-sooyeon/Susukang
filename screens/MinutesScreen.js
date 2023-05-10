import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Empty from '../components/Empty';
import MinuteList from '../components/MinuteList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dialog from 'react-native-dialog';

const getDate = today => {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const date = `${year}.${month}.${day}`;

  return date;
};

const MinutesScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [visible, setVisible] = useState(false);
  const [datas, setDatas] = useState([
    {
      id: 1,
      title: '스마트물류 프로젝트 오티',
      department: '소프트웨어공학과',
      date: '2023.4.5',
      content:
        'hello my name is sooyeon hello my name is sooyeon hello my name is sooyeon',
    },
    {
      id: 2,
      title: '카카오테크캠퍼스',
      department: '카카오',
      date: '2023.4.10',
      content:
        'hello this is page is modifed minute page hello this is page is modifed minute page',
    },
  ]);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    if (title === '') {
      Alert.alert('문서 추가', '제목은 공백으로 둘 수 없습니다.');

      setVisible(false);
    } else {
      onInsert(title, department);
      // 서버에 새로운 문서 추가 코드 추가
      setVisible(false);
    }
    setTitle('');
    setDepartment('');
    Keyboard.dismiss();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableOpacity onPress={showDialog} style={styles.addButton}>
            <Icon name="add" size={28} color="black" />
          </TouchableOpacity>
          <View>
            <Dialog.Container visible={visible}>
              <Dialog.Title>문서 추가</Dialog.Title>
              <Dialog.Description>
                문서 제목과 소속을 입력해주세요.
              </Dialog.Description>
              <Dialog.Input
                placeholder="문서 제목"
                value={title}
                onChangeText={setTitle}
              />
              <Dialog.Input
                placeholder="소속"
                value={department}
                onChangeText={setDepartment}
              />
              <Dialog.Button label="취소" onPress={handleCancel} />
              <Dialog.Button label="확인" onPress={handleOk} />
            </Dialog.Container>
          </View>
        </View>
      ),
    });
  });

  const today = new Date();

  const onRemove = id => {
    const nextDatas = datas.filter(data => data.id !== id);
    setDatas(nextDatas);

    // 서버에 삭제한 문서 전달하는 코드 추가
  };

  const onToggle = (id, title, department, date) => {
    setDatas(datas =>
      datas.map(data =>
        data.id === id
          ? {...data, title: title, department: department, date: date}
          : data,
      ),
    );
  };

  const onInsert = (inputTitle, inputDepartment) => {
    const nextId =
      datas.length > 0 ? Math.max(...datas.map(data => data.id)) + 1 : 1;

    const data = {
      id: nextId,
      title: inputTitle,
      department: inputDepartment,
      date: getDate(today),
      content: '',
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
        <MinuteList
          datas={datas}
          onRemove={onRemove}
          getDate={getDate}
          today={today}
          onToggle={onToggle}
        />
      )}
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
  addButton: {
    marginRight: 16,
  },
});

export default MinutesScreen;
