// src/components/MoodInsight.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MoodEntry } from '../types';

interface MoodInsightProps {
  entry: MoodEntry | null;
}

const MoodInsight: React.FC<MoodInsightProps> = ({ entry }) => {
  if (!entry || !entry.insight) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Insight</Text>
      <Text style={styles.date}>
        {new Date(entry.date).toLocaleString()}
      </Text>
      <Text style={styles.insight}>{entry.insight}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  insight: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MoodInsight;