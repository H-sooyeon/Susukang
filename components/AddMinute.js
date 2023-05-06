import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddMinue = ({onInsert}) => {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');

  const onPress = () => {
    if (title === '') {
      Alert.alert('문서 추가', '제목은 공백으로 둘 수 없습니다.');
    } else {
      onInsert(title, department);
    }
    setTitle('');
    setDepartment('');
    Keyboard.dismiss();
  };
  // add-circle
  return (
    <View style={styles.block}>
      <TextInput
        placeholder="문서 제목을 입력하세요."
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={onPress}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.Addbutton} onPress={onPress}>
        <Icon name="add-circle" size={35} color="#1976D2" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    height: 50,
    paddingHorizontal: 16,
    borderColor: '#bdbdbd',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 17,
    paddingVertical: 8,
  },
});

export default AddMinue;
