import React from 'react';
import {View, StatusBar, StyleSheet, FlatList, Text} from 'react-native';
import MinuteItem from './MinuteItem';

const MinuteList = ({datas, onRemove}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.minuteList}
        data={datas}
        renderItem={({item}) => (
          <View>
            <MinuteItem
              id={item.id}
              title={item.title}
              department={item.department}
              date={item.date}
              onRemove={onRemove}
            />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
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
