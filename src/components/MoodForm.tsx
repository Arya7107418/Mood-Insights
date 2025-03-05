// src/components/MoodForm.tsx
import React, { useState } from 'react';
import  { FC } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { getAIInsight } from '../services/api';
import { saveMoodEntry } from '../utils/storage';
import { MoodEntry } from '../types';

interface MoodFormProps {
  onInsightReceived: (entry: MoodEntry) => void;
}

const MoodForm: React.FC<MoodFormProps> = ({ onInsightReceived }) => {
  // State variables for the form
  const [moodScale, setMoodScale] = useState(5);
  const [moodDescription, setMoodDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to get the mood label based on scale value
  const getMoodLabel = (scale: number): string => {
    if (scale <= 2) return 'Very Bad';
    if (scale <= 4) return 'Bad';
    if (scale <= 6) return 'Neutral';
    if (scale <= 8) return 'Good';
    return 'Very Good';
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate inputs
    if (moodDescription.trim() === '') {
      Alert.alert('Error', 'Please describe your mood');
      return;
    }

    try {
      setLoading(true);
      
      // Generate unique ID
      const id = Date.now().toString();
      
      // Create date string
      const date = new Date().toISOString();
      
      // Get AI insight
      const insight = await getAIInsight({
        scale: moodScale,
        description: moodDescription,
      });
      
      // Create mood entry object
      const newEntry: MoodEntry = {
        id,
        scale: moodScale,
        description: moodDescription,
        date,
        insight,
      };
      
      // Save to storage
      await saveMoodEntry(newEntry);
      
      // Call the callback with the new entry
      onInsightReceived(newEntry);
      
      // Reset form
      setMoodDescription('');
      setMoodScale(5);
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      
      {/* Mood scale slider */}
      <View style={styles.sliderContainer}>
        <Text style={styles.moodLabel}>
          {getMoodLabel(moodScale)} ({moodScale})
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={moodScale}
          onValueChange={setMoodScale}
          minimumTrackTintColor="#4CAF50"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#4CAF50"
        />
        <View style={styles.sliderLabels}>
          <Text>1</Text>
          <Text>10</Text>
        </View>
      </View>
      
      {/* Mood description input */}
      <TextInput
        style={styles.input}
        placeholder="Describe your mood in a few words..."
        value={moodDescription}
        onChangeText={setMoodDescription}
        multiline
        numberOfLines={3}
      />
      
      {/* Submit button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Get AI Insight</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sliderContainer: {
    marginBottom: 16,
  },
  moodLabel: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MoodForm;