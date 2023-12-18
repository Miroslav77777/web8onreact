import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types/habit';

const KEY = 'habits';

export async function loadHabits(): Promise<Habit[]> {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveHabits(habits: Habit[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(habits));
}
