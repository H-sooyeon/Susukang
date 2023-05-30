import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SpeechBubble = ({text, direction}) => {
  const rightBotomText = 'hello';
  const leftBottomText = '안녕하세요';
  return (
    <View
      style={
        direction === 'left' ? styles.containerLeft : styles.containerRight
      }>
      <Text
        style={[
          styles.speechText,
          direction === 'left' ? styles.textLeft : styles.textRight,
        ]}>
        {text}
        {'\n'}
        <View style={styles.bottomContainer}>
          <Text
            style={[
              direction === 'right'
                ? styles.bottomTextRight
                : styles.bottomTextLeft,
            ]}>
            <Text>
              {direction === 'left' ? leftBottomText : rightBotomText}
            </Text>
          </Text>
        </View>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLeft: {
    alignItems: 'flex-start',
    boxShadow: '2px 2px 3px #d1d1d1',
    marginBottom: 10,
    marginRight: 100,
  },
  containerRight: {
    alignItems: 'flex-end',
    boxShadow: '2px 2px 3px #d1d1d1',
    marginBottom: 10,
    marginLeft: 100,
  },
  textRight: {
    fontSize: 18,
    color: '#1976D2',
    backgroundColor: 'white',
    borderColor: '#CCE1FF',
    fontWeight: 600,
    borderWidth: 1,
    borderRadius: 17,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 10,
  },
  textLeft: {
    fontSize: 18,
    color: '#323232',
    backgroundColor: '#CCE1FF',
    borderRadius: 17,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 10,
  },
  bottomTextRight: {
    color: '#28288C',
    fontSize: 18,
  },
  bottomTextLeft: {
    color: '#1976D2',
    fontSize: 18,
    fontWeight: 600,
  },
});

export default SpeechBubble;
