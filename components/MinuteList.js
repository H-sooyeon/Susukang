import React from 'react';
import {View, StatusBar, StyleSheet, FlatList} from 'react-native';
import MinuteItem from './MinuteItem';

const MinuteList = ({files, onRemove, getDate, today, onToggle}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.minuteList}
        data={files}
        renderItem={({item}) => (
          <View>
            <MinuteItem
              title={item.title}
              department={item.department}
              date={item.date}
              onRemove={onRemove}
              content={item.content}
              getDate={getDate}
              today={today}
              onToggle={onToggle}
              file={item}
            />
          </View>
        )}
        keyExtractor={file => file.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});

export default MinuteList;
