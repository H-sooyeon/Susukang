import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import SpeechBubble from './SpeechBubble';

const AddMinue = ({Messages, direction}) => {
  return (
    <FlatList
      style={styles.list}
      data={Messages}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <SpeechBubble text={item.text} direction={direction} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30,
  },
});

export default AddMinue;
