import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const Language = [
  {label: '한국어(Korean)', value: '1'},
  {label: '영어(English)', value: '2'},
  {label: '중국어(Chinese)', value: '3'},
  {label: '일본어(Japanese)', value: '4'},
  {label: '독일어(German)', value: '5'},
  {label: '몽골어(Mongolian)', value: '6'},
  {label: '베트남어(Vietnamese)', value: '7'},
  {label: '프랑스어(French)', value: '8'},
];

const Category = [
  {label: '항만', value: '1'},
  {label: '회계', value: '2'},
  {label: '소프트웨어 및 ICT', value: '3'},
];

const TranslationSettingsScreen = ({navigation}) => {
  const [languageData, setLanguageData] = useState(null);
  const [languageName, setLanguageName] = useState('');
  const [categoryData, setCategoryData] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.logo}>
        <Text style={styles.logoText}>Susukang</Text>
      </View>
      <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Language}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Language' : '...'}
          searchPlaceholder="Search..."
          value={languageData}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setLanguageData(item.value);
            setLanguageName(item.label);
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Category}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Category' : '...'}
          searchPlaceholder="Search..."
          value={categoryData}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCategoryData(item.value);
            setCategoryName(item.label);
            setIsFocus(false);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#0F3460',
            padding: 20,
            borderRadius: 15,
            alignItems: 'center',
          }}
          onPress={() =>
            languageData && categoryData
              ? Alert.alert(
                  '선택이 맞는지 확인해주세요.',
                  `언어: ${languageName}\n분야: ${categoryName}`,
                  [
                    {
                      text: '확인',
                      onPress: () => {
                        navigation.navigate('Chatting', {
                          languageName: languageName,
                          categoryName: categoryName,
                          languageNumber: languageData,
                          categoryNumber: categoryData,
                        });

                        setLanguageData(null);
                        setLanguageName('');
                        setCategoryData(null);
                        setCategoryName('');
                      },
                      style: 'default',
                    },
                    {text: '취소', onPress: () => {}, stule: 'cancel'},
                  ],
                  {cancelable: true, onDismiss: () => {}},
                )
              : Alert.alert('입력', '언어와 분야를 모두 선택해주세요!', [
                  {text: '확인', onPress: () => {}, style: 'default'},
                ])
          }>
          <Text
            style={{
              color: '#fff',
              textTransform: 'uppercase',
              fontWeight: '600',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TranslationSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1976D2',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  logo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 30,
    color: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: '500',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontWeight: '500',
  },
});
