import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Dialog from 'react-native-dialog';

const ChattingScreen = ({route, navigation}) => {
  const [language, setLanguage] = useState(route.params.languageName);
  const [category, setCategory] = useState(route.params.categoryName);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [visible, setVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `${language} ${category}`,
    });
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={showDialog}>
          <Text style={styles.languageChange}>변경</Text>
        </TouchableOpacity>
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
  };

  const handleOk = () => {
    setLanguage(selectedLanguage);
    setCategory(selectedCategory);
    // 서버로부터의 번역 언어 재설정
    setVisible(false);
  };

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
        <Dialog.Container visible={visible}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
  },
  languageChange: {
    color: '#1976D2',
    marginLeft: 3,
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
});

export default ChattingScreen;
