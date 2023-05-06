import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Dialog from 'react-native-dialog';

const MinuteItem = ({
  id,
  title,
  department,
  date,
  content,
  onRemove,
  datas,
  onToggle,
  getDate,
}) => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [itemTitle, setitemTitle] = useState(title);
  const [itemDepartment, setitemDepartment] = useState(department);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    const today = new Date();

    if (itemTitle === '') {
      Alert.alert('제목은 공백으로 둘 수 없습니다.');

      setitemTitle(title);
      setitemDepartment(department);
    } else {
      onToggle(id, itemTitle, itemDepartment, getDate(today));
      // 서버에 저장된 문서 정보 수정하는 코드 추가
    }
    setVisible(false);
  };

  const DownFile = () => {};

  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.Icon} onPress={DownFile}>
        <Icon name="arrow-circle-down" size={30} color="#1976D2" />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('openFile', {
              id: id,
              title: title,
              department: department,
              date: date,
              content: content,
              datas: datas,
            })
          }>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.bottomData}>
            <Text style={styles.department}>{department}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rightIcon}>
        <TouchableOpacity
          style={[styles.summary, {marginRight: 5}]}
          onPress={showDialog}>
          <Icon name="edit" size={30} />
          <Text style={styles.summaryText}>수정</Text>
        </TouchableOpacity>
        <View>
          <Dialog.Container visible={visible}>
            <Dialog.Title>정보 수정</Dialog.Title>
            <Dialog.Description>변경 사항을 입력해주세요.</Dialog.Description>
            <Dialog.Input
              value={itemTitle}
              onChangeText={setitemTitle}
              onPressIn={() => console.log(visible)}
            />
            <Dialog.Input
              value={itemDepartment}
              onChangeText={setitemDepartment}
            />
            <Dialog.Button label="취소" onPress={handleCancel} />
            <Dialog.Button label="확인" onPress={handleOk} />
          </Dialog.Container>
        </View>
        <TouchableOpacity style={[styles.summary, {marginRight: 5}]}>
          <Icon name="wysiwyg" size={30} color="#C0C0C0" />
          <Text style={styles.summaryText}>요약</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.summary} onPress={() => onRemove(id)}>
          <Icon name="delete" size={30} color="#cd5c5c" />
          <Text style={styles.summaryText}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 16,
  },
  Icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderRadius: 50,
  },
  rightIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#212121',
  },
  bottomData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summary: {
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 12,
  },
});

export default MinuteItem;
