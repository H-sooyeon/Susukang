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
  const [chatting, setChatting] = useState('');

  const onPress = () => {
    setChatting('');
    Keyboard.dismiss();
  };
  // add-circle
  return (
    <View style={styles.block}>
      <TextInput
        placeholder="입력"
        style={styles.input}
        value={chatting}
        onChangeText={setChatting}
        onSubmitEditing={onPress}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.Addbutton} onPress={onPress}>
        <Icon name="send" size={27} color="#1976D2" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    height: 50,
    paddingHorizontal: 16,
    borderColor: 'transparent',
    borderTopColor: '#bdbdbd',
    borderWidth: 0.8,
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
