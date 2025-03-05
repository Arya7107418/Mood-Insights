// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import MoodForm from '../components/MoodForm';
import MoodInsight from '../components/MoodInsight';
import { MoodEntry } from '../types';
import { getMoodEntries } from '../utils/storage';

const HomeScreen: React.FC = () => {
  const [currentEntry, setCurrentEntry] = useState<MoodEntry | null>(null);

  // Handle when a new insight is received
  const handleInsightReceived = (entry: MoodEntry) => {
    setCurrentEntry(entry);
  };

  // Load the most recent entry when the component mounts
  useEffect(() => {
    const loadLatestEntry = async () => {
      const entries = await getMoodEntries();
      if (entries.length > 0) {
        // Sort by date (newest first) and take the first one
        const sortedEntries = entries.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setCurrentEntry(sortedEntries[0]);
      }
    };
    
    loadLatestEntry();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MoodForm onInsightReceived={handleInsightReceived} />
        <MoodInsight entry={currentEntry} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
});

export default HomeScreen;