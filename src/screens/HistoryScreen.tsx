// src/screens/HistoryScreen.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import MoodHistory from '../components/Moodhistory';
import { MoodEntry } from '../types';
import { getMoodEntries } from '../utils/storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types'

type Props = StackScreenProps<RootStackParamList, 'History'>;

const HistoryScreen: React.FC<Props> = ({ navigation, route  }) => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  // Load all entries when the component mounts
  useEffect(() => {
    const loadEntries = async () => {
      const allEntries = await getMoodEntries();
      setEntries(allEntries);
    };
    
    loadEntries();
    
    // Also refresh when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', loadEntries);
    return unsubscribe;
  }, [navigation]);

  // Handle selecting an entry
  const handleSelectEntry = (entry: MoodEntry) => {
    navigation.navigate("Home");
    // You could also create a detail screen and navigate to it
  };

  return (
    <SafeAreaView style={styles.container}>
      <MoodHistory entries={entries} onSelectEntry={handleSelectEntry} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
});

export default HistoryScreen;