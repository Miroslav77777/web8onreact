import * as Notifications from 'expo-notifications';

export async function scheduleDailyNotification(hour: number, minute: number) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);

  // Если время сегодня уже прошло — назначаем на завтра
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  const secondsUntilTrigger = Math.round((target.getTime() - now.getTime()) / 1000);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '⏰ Не забудь привычку!',
      body: 'Ты уже отметил свои привычки сегодня?',
    },
    trigger: {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 60,
    },
  });
}
