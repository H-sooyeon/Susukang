import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SpeechBubble = ({text, direction}) => {
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
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLeft: {
    alignItems: 'flex-start',
    boxShadow: '2px 2px 3px #d1d1d1',
  },
  containerRight: {
    alignItems: 'flex-end',
    boxShadow: '2px 2px 3px #d1d1d1',
  },
  textRight: {
    fontSize: 15,
    color: 'white',
    backgroundColor: '#148CFF',
    borderRadius: 17,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 20,
  },
  textLeft: {
    fontSize: 15,
    color: 'black',
    backgroundColor: '#C8D7FF',
    borderRadius: 17,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 20,
  },
});

export default SpeechBubble;
