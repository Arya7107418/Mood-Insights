// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoodEntry } from '../types';

// Key for storing mood entries
const MOOD_ENTRIES_KEY = 'mood_entries';

// Save a mood entry to storage
export const saveMoodEntry = async (entry: MoodEntry): Promise<void> => {
  try {
    // Get existing entries
    const existingEntries = await getMoodEntries();
    
    // Add new entry
    const updatedEntries = [...existingEntries, entry];
    
    // Save updated entries
    await AsyncStorage.setItem(MOOD_ENTRIES_KEY, JSON.stringify(updatedEntries));
  } catch (error) {
    console.error('Error saving mood entry:', error);
    throw error;
  }
};

// Get all mood entries from storage
export const getMoodEntries = async (): Promise<MoodEntry[]> => {
  try {
    const entriesJson = await AsyncStorage.getItem(MOOD_ENTRIES_KEY);
    return entriesJson ? JSON.parse(entriesJson) : [];
  } catch (error) {
    console.error('Error getting mood entries:', error);
    return [];
  }
};

// Update a specific mood entry (to add AI insight later)
export const updateMoodEntry = async (id: string, updates: Partial<MoodEntry>): Promise<void> => {
  try {
    const entries = await getMoodEntries();
    const updatedEntries = entries.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    );
    await AsyncStorage.setItem(MOOD_ENTRIES_KEY, JSON.stringify(updatedEntries));
  } catch (error) {
    console.error('Error updating mood entry:', error);
    throw error;
  }
};