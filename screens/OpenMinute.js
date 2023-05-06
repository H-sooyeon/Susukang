import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OpenMinute = ({navigation, route}) => {
  const [content, setContent] = useState(route.params.content);
  const [datas, setDatas] = useState(route.params.datas);

  // 서버와 연결해서 내용 수정, 저장하는 기능 추가(아래 코드 수정)
  const onToggle = (id, content, title, department) => {
    setDatas(datas =>
      datas.map(data =>
        data.id === id
          ? {...data, content: content, title: title, department: department}
          : data,
      ),
    );
  };

  useEffect(() => {
    navigation.setOptions({title: route.params.title});
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onToggle(route.params.id)}>
          <Icon name="save" size={20} color="black" />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.content}
        multiline={true}
        onChangeText={setContent}
        value={content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    margin: 16,
    fontSize: 16,
    flexShrink: 1,
  },
});

export default OpenMinute;
