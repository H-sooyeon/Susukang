import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Keyboard,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import GoogleCloudSpeechToText, {
  SpeechRecognizeEvent,
  VoiceStartEvent,
  SpeechErrorEvent,
  VoiceEvent,
  SpeechStartEvent,
} from 'react-native-google-cloud-speech-to-text';
import {Dropdown} from 'react-native-element-dropdown';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddChattings from '../components/AddChatting';
import FileContext from '../contexts/FileContext';
import STTContext from '../contexts/STTContext';
import axios from 'axios';

const GOOGLE_TRANSLATE_API_KEY = 'AIzaSyAyXF5gnFFgSuDXlOHLUzoq3SLfFuL_HDQ';

const ChattingScreen = ({route, navigation}) => {
  const [transcript, setResult] = useState('');
  const [inputResult, setInputResults] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const [language, setLanguage] = useState(route.params.languageName);
  const [languageCode, setLanguageCode] = useState(route.params.languageCode);
  const [category, setCategory] = useState(route.params.categoryName);
  const [categoryCode, setCategoryCode] = useState(route.params.categoryCode);

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLanguageCode, setSelectedLanguageCode] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryCode, setSelectedCategoryCode] = useState('');

  const [visible, setVisible] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const [fileTitle, setFileTitle] = useState('');
  const [fileDepartment, setFileDepartment] = useState('');

  const {messages, AddMessage} = useContext(STTContext);

  const nextId = useRef(2);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      if (isRecording) {
        stopRecognizing();
      }
    });

    return unsubscribe;
  }, [navigation, isRecording]);

  useEffect(() => {
    GoogleCloudSpeechToText.setApiKey(
      'AIzaSyBxRxXtGyuJIlUz5uKYRMhNBb0Z4G5VxAE',
    );
    GoogleCloudSpeechToText.onVoice(onVoice);
    GoogleCloudSpeechToText.onVoiceStart(onVoiceStart);
    GoogleCloudSpeechToText.onVoiceEnd(onVoiceEnd);
    GoogleCloudSpeechToText.onSpeechError(onSpeechError);
    GoogleCloudSpeechToText.onSpeechRecognized(onSpeechRecognized);
    GoogleCloudSpeechToText.onSpeechRecognizing(onSpeechRecognizing);

    return () => {
      GoogleCloudSpeechToText.removeListeners();
    };
  }, [onSpeechRecognized]);

  useEffect(() => {
    requestMicrophonePermission();
  }, []);

  const onSpeechError = _error => {
    console.log('onSpeechError: ', _error);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSpeechRecognized = async result => {
    console.log('onSpeechRecognized: ', result);

    const direction = await detectLanguage(result.transcript);
    const di = direction === 'ko' ? 'right' : 'left';
    const sourceLanguage = di === 'ko' ? 'ko' : languageCode.substr(0, 2);
    const targetLanguage = di === 'ko' ? languageCode.substr(0, 2) : 'ko';

    const translateText = await translate(
      result.transcript,
      sourceLanguage,
      targetLanguage,
    );

    if (result.transcript !== '') {
      AddMessage({
        id: nextId.current,
        text: result.transcript,
        direction: di,
        languageCode: direction === 'ko' ? languageCode : 'ko-KR',
        translateText: translateText,
      });
      nextId.current += 1;
    }
  };

  const translate = async (text, sourceLanguage, targetLanguage) => {
    try {
      const translateUrl = `http://3.39.132.36:8080/translate`;
      const response = await axios.post(translateUrl, {
        Text: text,
        TerminologyNames: categoryCode,
        SourceLanguageCode: sourceLanguage,
        TargetLanguageCode: targetLanguage,
      });
      return response.data;
    } catch (error) {
      console.error('Error translate:', error);
    }
  };

  const detectLanguage = async text => {
    const textToTranslate = text; // 감지할 언어가 포함된 텍스트
    const url = `https://translation.googleapis.com/language/translate/v2/detect?key=${GOOGLE_TRANSLATE_API_KEY}`;

    try {
      const response = await axios.post(url, {
        q: textToTranslate,
      });

      const detectedLanguage = response.data.data.detections[0][0].language;
      //const direction = detectedLanguage === 'ko' ? 'right' : 'left';

      return detectedLanguage;
    } catch (error) {
      console.error('Error detecting language:', error);
    }
  };

  const onSpeechRecognizing = result => {
    console.log('onSpeechRecognizing: ', result);
    setResult(result.transcript);
  };

  const onVoiceStart = _event => {
    console.log('onVoiceStart', _event);
  };

  const onVoice = _event => {
    console.log('onVoice', _event);
  };

  const onVoiceEnd = () => {
    console.log('onVoiceEnd: ');
  };

  const stopRecognizing = async () => {
    setIsRecording(false);
    await GoogleCloudSpeechToText.stop();
  };

  const startRecognizing = async () => {
    setIsRecording(true);
    const result = await GoogleCloudSpeechToText.start({
      speechToFile: false,
      languageCode: languageCode,
    });

    const result2 = await GoogleCloudSpeechToText.start({
      speechToFile: false,
      languageCode: 'ko-KR',
    });

    console.log('startRecognizing', result);
    console.log('startRecognizing2:', result2);
  };

  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Microphone permission has been granted.');
      } else {
        console.log('Microphone permission has been denied.');
      }
    } catch (error) {
      console.log(
        'Error occurred while requesting microphone permission.',
        error,
      );
    }
  };

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

  const getDate = today => {
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const date = `${year}.${month}.${day}`;

    return date;
  };

  const {onCreate} = useContext(FileContext);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setSaveVisible(false);
  };

  const handleOk = () => {
    setLanguage(selectedLanguage);
    setLanguageCode(selectedLanguageCode);
    setCategory(selectedCategory);
    setCategoryCode(selectedCategoryCode);
    // 서버로부터의 번역 언어 재설정
    setVisible(false);
  };

  const showSave = () => {
    setSaveVisible(true);
  };

  const handleSaveOk = () => {
    setFileTitle('');
    setFileDepartment('');
    // 서버에 문서 저장하는 코드 추가
    setSaveVisible(false);

    let content = '';
    messages.map(id => {
      content += id.text;
      content += '\n';
    });

    onCreate({
      title: fileTitle,
      department: fileDepartment,
      content: content,
      date: getDate(new Date()),
    });

    Alert.alert(
      '회의록에 문서 저장 완료!',
      `파일 제목: ${fileTitle}\n소속: ${fileDepartment}`,
    );

    navigation.navigate('MainTabScreen', {
      content: messages,
      title: fileTitle,
      department: fileDepartment,
    });
  };

  const sendMessage = async () => {
    const direction = await detectLanguage(inputResult);

    const sourceLanguage =
      direction === 'ko' ? 'ko' : languageCode.substr(0, 2);
    const targetLanguage =
      direction === 'ko' ? languageCode.substr(0, 2) : 'ko';

    const translateText = await translate(
      inputResult,
      sourceLanguage,
      targetLanguage,
    );
    console.log(translateText);

    if (inputResult !== '') {
      AddMessage({
        id: nextId.current,
        text: inputResult,
        direction: 'right',
        languageCode: direction === 'ko' ? languageCode : 'ko-KR',
        translateText: translateText,
      });
      nextId.current += 1;
    }

    setInputResults('');
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor="#1976D2" barStyle="light-content" />
      <View>
        <Dialog.Container
          visible={visible}
          style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
          <Dialog.Title style={styles.changeTitle}>언어 설정 변경</Dialog.Title>
          <Dropdown
            style={styles.dropdown}
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
            value={languageCode}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSelectedLanguage(item.label);
              setSelectedLanguageCode(item.value);
              setIsFocus(false);
            }}
          />
          <Dropdown
            style={styles.dropdown}
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
            value={categoryCode}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSelectedCategory(item.label);
              setSelectedCategoryCode(
                item.value === 'default' ? '' : item.value,
              );
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
        <AddChattings
          stopRecognizing={stopRecognizing}
          startRecognizing={startRecognizing}
          isRecording={isRecording}
        />
      </View>
      {/* <Text style={{fontSize: 30}}>{transcript}</Text> */}
      <View style={styles.block}>
        <TextInput
          placeholder="입력"
          style={styles.input}
          value={inputResult}
          onChangeText={text => {
            setInputResults(text);
          }}
          onSubmitEditing={sendMessage}
          returnKeyType="done"
        />
        <TouchableOpacity
          onPress={isRecording ? stopRecognizing : startRecognizing}>
          <Icon
            name="mic"
            size={27}
            color="black"
            style={[{marginRight: 20}]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.Addbutton} onPress={sendMessage}>
          <Icon name="send" size={27} color="#1976D2" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    color: 'white',
    marginLeft: 5,
    marginRight: 2,
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
