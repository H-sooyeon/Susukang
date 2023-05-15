import React from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet} from 'react-native';

const CalendarView = () => {
  const markedDates = {
    '2023-05-15': {
      selected: true,
    },
    '2023-05-17': {
      marked: true,
    },
    '2023-05-31': {
      marked: true,
    },
  };

  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedDates}
      theme={{
        selectedDayBackgroundColor: '#1976D2',
        arrowColor: '#1976D2',
        dotColor: '#1976D2',
        todayTextColor: '#1976D2',
      }}></Calendar>
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarView;
