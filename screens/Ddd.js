import React, {useEffect, useState, createContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import GoogleCloudSpeechToText, {
  SpeechRecognizeEvent,
  VoiceStartEvent,
  SpeechErrorEvent,
  VoiceEvent,
  SpeechStartEvent,
} from 'react-native-google-cloud-speech-to-text';

const Separator = () => <View style={styles.separator} />;

export default function App() {
  const [transcript, setResult] = useState('');
  const [language, setLanguage] = useState('en-US');

  useEffect(() => {
    setLanguage('en-US'); // 기본 언어 설정
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
      title: 'Cool Photo App Camera Permission',
      message:
        'Cool Photo App needs access to your camera ' +
        'so you can take awesome pictures.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
  }, []);

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
  }, []);

  const onSpeechError = _error => {
    console.log('onSpeechError: ', _error);
  };

  const onSpeechRecognized = result => {
    console.log('onSpeechRecognized: ', result);
    setResult(result.transcript);
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

  const startRecognizing = async () => {
    const result = await GoogleCloudSpeechToText.start({
      speechToFile: false,
      languageCode: language,
    });
    const result2 = await GoogleCloudSpeechToText.start({
      speechToFile: false,
      languageCode: 'ko-KR',
    });
    console.log('startRecognizing', result);
    console.log('startRecognizing2:', result2);
  };

  const stopRecognizing = async () => {
    await GoogleCloudSpeechToText.stop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>{transcript}</Text>
        <Button title="Start me" onPress={startRecognizing} />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>{transcript}</Text>
        <Button title="Stop me" color="#f194ff" onPress={stopRecognizing} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
