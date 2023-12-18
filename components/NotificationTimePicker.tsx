import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Text } from 'react-native-paper';
import { scheduleDailyNotification } from '../utils/notifications';
import { useNotificationTime } from '../hooks/useNotificationTime';

export default function NotificationTimePicker() {
  const { time, saveTime } = useNotificationTime();
  const [show, setShow] = useState(false);

  const onChange = async (_: any, selectedTime?: Date) => {
    setShow(false);
    if (selectedTime) {
      await saveTime(selectedTime);
      await scheduleDailyNotification(
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
    }
  };

  const formatted = time
    ? `${String(time.getHours()).padStart(2, '0')}:${String(
        time.getMinutes()
      ).padStart(2, '0')}`
    : 'не выбрано';

  return (
    <View style={{ marginVertical: 20 }}>
      <Text>Время уведомления: {formatted}</Text>
      <Button onPress={() => setShow(true)} mode="outlined">
        Изменить время
      </Button>
      {show && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          is24Hour
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
    </View>
  );
}
