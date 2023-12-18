import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import HabitCard from '../components/HabitCard';
import { Habit } from '../types/habit';
import { loadHabits, saveHabits } from '../utils/storage';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationTimePicker from '../components/NotificationTimePicker';


export default function Home() {
    useNotifications();
    const [habits, setHabits] = useState<Habit[]>([]);
    const [input, setInput] = useState('');
    const { colors } = useTheme();

    useEffect(() => {
        loadHabits().then(setHabits);
    }, []);

    const addHabit = async () => {
        if (!input.trim()) return;
        const newHabit: Habit = {
        id: Date.now().toString(),
        title: input.trim(),
        done: false,
        };
        const updated = [...habits, newHabit];
        setHabits(updated);
        setInput('');
        await saveHabits(updated);
    };

    const toggleHabit = async (id: string) => {
        const updated = habits.map(h =>
        h.id === id ? { ...h, done: !h.done } : h
        );
        setHabits(updated);
        await saveHabits(updated);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text variant="headlineMedium" style={styles.header}>
            📆 Хаб Привычек
        </Text>
        <TextInput
            label="Новая привычка"
            value={input}
            onChangeText={setInput}
            style={styles.input}
        />
        <NotificationTimePicker />
        <Button mode="contained" onPress={addHabit} style={styles.button}>
            Добавить
        </Button>
        <FlatList
            data={habits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <HabitCard habit={item} onToggle={() => toggleHabit(item.id)} />
            )}
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 50 },
    input: { marginBottom: 10 },
    button: { marginBottom: 20 },
    header: { fontWeight: 'bold', marginBottom: 20 },
});
