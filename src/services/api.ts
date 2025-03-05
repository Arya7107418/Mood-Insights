// src/services/api.ts
import axios from 'axios';
import { MoodEntry } from '../types';

// Base URL of your server
const API_URL = 'http://10.0.2.2:3000'; // Use this for Android emulator
// For iOS simulator, use: 'http://localhost:3000'

// Function to get AI insight for a mood entry
export const getAIInsight = async (moodData: Omit<MoodEntry, 'id' | 'date' | 'insight'>): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/api/insight`, moodData);
    return response.data.insight;
  } catch (error) {
    console.error('Error getting AI insight:', error);
    throw new Error('Failed to get AI insight. Please try again.');
  }
};