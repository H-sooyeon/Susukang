import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SpeechBubble = ({text, direction}) => {
  const botext = 'my name is sooyeon!!!';
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
          <Text style={styles.bottomText}>{botext}</Text>
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
    color: 'white',
    backgroundColor: '#148CFF',
    borderRadius: 17,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 15,
  },
  textLeft: {
    fontSize: 18,
    color: 'black',
    backgroundColor: '#C8D7FF',
    borderRadius: 17,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 15,
  },
  bottomText: {
    color: '#BECDFF',
    fontSize: 15,
  },
});

export default SpeechBubble;
