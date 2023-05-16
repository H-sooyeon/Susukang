import React, {useEffect, useState, useContext, useMemo} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from 'react-native';
import CalendarView from '../components/CalendarView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dialog from 'react-native-dialog';
import {format} from 'date-fns';
import ScheduleContext from '../contexts/ScheduleContext';

const CalendarScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  // const markedDates = posts.reduce((acc, current) => {
  //   const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
  //   acc[formattedDate] = {marked: true};
  //   return acc;
  // }, {});

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableOpacity onPress={showDialog} style={styles.addButton}>
            <Icon name="add" size={28} color="black" />
          </TouchableOpacity>
          <View>
            <Dialog.Container visible={visible}>
              <Dialog.Title>일정 추가</Dialog.Title>
              <Dialog.Button label="취소" onPress={handleCancel} />
              <Dialog.Button label="확인" onPress={handleOk} />
            </Dialog.Container>
          </View>
        </View>
      ),
    });
  });

  const {schedules} = useContext(ScheduleContext);

  const markedDates = useMemo(
    () =>
      schedules.reduce((acc, current) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = {marked: true};
        return acc;
      }, {}),
    [schedules],
  );

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
    Keyboard.dismiss();
  };

  const filteredSchedules = schedules.filter(
    schedule => format(new Date(schedule.date), 'yyyy-MM-dd') === selectedDate,
  );

  return (
    <View style={styles.container}>
      <CalendarView
        markedDates={markedDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <FlatList
        data={filteredSchedules}
        style={styles.schedule}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
        keyExtractor={schedule => schedule.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addButton: {
    marginRight: 16,
  },
});

export default CalendarScreen;
