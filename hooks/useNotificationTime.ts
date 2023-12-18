import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'notificationTime';

export const useNotificationTime = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(json => {
      if (json) setTime(new Date(json));
    });
  }, []);

  const saveTime = async (newTime: Date) => {
    setTime(newTime);
    await AsyncStorage.setItem(STORAGE_KEY, newTime.toISOString());
  };

  return { time, saveTime };
};
