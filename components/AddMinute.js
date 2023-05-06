import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddMinue = ({onInsert}) => {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');

  const onPress = () => {
    onInsert(title, department);
    setTitle('');
    setDepartment('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="제목을 입력하세요."
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={onPress}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.Addbutton} onPress={onPress}>
        <Icon name="add-circle" size={30} color="#1976D2" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    height: 55,
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
