import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';

export const useNotifications = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
};

async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Не удалось получить разрешение на уведомления');
      return;
    }
  }
}
