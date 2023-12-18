import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Checkbox, useTheme } from 'react-native-paper';
import { Habit } from '../types/habit';

interface Props {
  habit: Habit;
  onToggle: () => void;
}

export default function HabitCard({ habit, onToggle }: Props) {
  const { colors } = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]} onPress={onToggle}>
      <Card.Title
        title={habit.title}
        right={() => (
          <Checkbox
            status={habit.done ? 'checked' : 'unchecked'}
            onPress={onToggle}
          />
        )}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
});
