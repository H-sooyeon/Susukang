import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Keyboard,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddChattings from '../components/AddChatting';
import Voice from '@react-native-voice/voice';

const ChattingScreen = ({route, navigation}) => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechError = err => setError(err.error);
  Voice.onSpeechResults = result => setResult(result.value[0]);

  const [language, setLanguage] = useState(route.params.languageName);
  const [category, setCategory] = useState(route.params.categoryName);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [visible, setVisible] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const [fileTitle, setFileTitle] = useState('');
  const [fileDepartment, setFileDepartment] = useState('');
  const [isInput, setIsInput] = useState(false);

  const [messageText, setMessageText] = useState('');
  const [Messages, setMessages] = useState([{id: 1, text: 'hello'}]);

  useEffect(() => {
    navigation.setOptions({
      title: `${language}  |  ${category}`,
      headerTitleAlign: 'left',
    });
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.header}>
          <TouchableOpacity onPress={showDialog}>
            <Text style={styles.headerButton}>변경</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showSave}>
            <Text style={[styles.headerButton, {marginLeft: 12}]}>저장</Text>
          </TouchableOpacity>
        </View>
      ),
      headerTitleStyle: {
        flexShrink: 1,
        fontSize: 16,
      },
    });
  });

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setSaveVisible(false);
  };

  const handleOk = () => {
    setLanguage(selectedLanguage);
    setCategory(selectedCategory);
    // 서버로부터의 번역 언어 재설정
    setVisible(false);
  };

  const showSave = () => {
    setSaveVisible(true);
  };

  const handleSaveOk = () => {
    setFileTitle('');
    setFileDepartment('');
    console.log('파일 저장 완료!');
    // 서버에 문서 저장하는 코드 추가
    setSaveVisible(false);
    Alert.alert(
      '회의록에 문서 저장 완료!',
      `파일 제목: ${fileTitle}\n소속: ${fileDepartment}`,
    );

    navigation.navigate('MainTabScreen', {
      content: Messages,
      title: fileTitle,
      department: fileDepartment,
    });
  };

  const startRecording = async () => {
    try {
      setResult('');
      setIsInput(false);
      await Voice.start('en-US');
    } catch (err) {
      setError(err);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      setError(error);
    }
  };

  const sendMessage = () => {
    const nextId =
      Messages.length > 0
        ? Math.max(...Messages.map(Message => Message.id)) + 1
        : 1;
    const message = {
      id: nextId,
      text: result,
    };
    setMessages(Messages.concat(message));
    console.log(Messages);
    setResult('');
    Keyboard.dismiss();
    setIsRecording(true);
    startRecording();
  };

  if (!isRecording && !isInput && result.length > 0) {
    console.log(isRecording);
    sendMessage();
  }

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View>
        <Dialog.Container
          visible={visible}
          style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
          <Dialog.Title style={styles.changeTitle}>언어 설정 변경</Dialog.Title>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={route.params.Language}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? '언어 선택' : '...'}
            searchPlaceholder="검색"
            value={language}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSelectedLanguage(item.label);
              setIsFocus(false);
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={route.params.Category}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? '분야 선택' : '...'}
            searchPlaceholder="검색"
            value={category}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSelectedCategory(item.label);
              setIsFocus(false);
            }}
          />
          <Dialog.Button label="취소" onPress={handleCancel} />
          <Dialog.Button label="확인" onPress={handleOk} />
        </Dialog.Container>
      </View>
      <View>
        <Dialog.Container
          visible={saveVisible}
          style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
          <Dialog.Title style={styles.changeTitle}>문서 저장</Dialog.Title>
          <Dialog.Input
            placeholder="문서 제목"
            value={fileTitle}
            onChangeText={setFileTitle}
          />
          <Dialog.Input
            placeholder="소속"
            value={fileDepartment}
            onChangeText={setFileDepartment}
          />
          <Dialog.Button label="취소" onPress={handleCancel} />
          <Dialog.Button label="확인" onPress={handleSaveOk} />
        </Dialog.Container>
      </View>
      <View style={styles.chatting}>
        <AddChattings Messages={Messages} direction="Right" />
      </View>
      <Text style={{fontSize: 30}}>{result}</Text>
      <Text style={{color: 'red'}}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Text>
      <View style={styles.block}>
        <TextInput
          placeholder="입력"
          style={styles.input}
          value={result}
          onChangeText={text => {
            setResult(text);
            setIsInput(true);
          }}
          onSubmitEditing={sendMessage}
          returnKeyType="done"
        />
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}>
          <Icon
            name="mic"
            size={27}
            color="black"
            style={[{marginRight: 10}]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.Addbutton} onPress={sendMessage}>
          <Icon name="send" size={27} color="#1976D2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
  },
  headerButton: {
    color: '#1976D2',
    marginLeft: 5,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 17,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: '500',
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: '500',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  changeTitle: {
    marginBottom: 13,
  },
  chatting: {
    flex: 1,
    marginTop: 15,
  },
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

export default ChattingScreen;
