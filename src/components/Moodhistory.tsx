// src/components/MoodHistory.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MoodEntry } from '../types';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

interface MoodHistoryProps {
  entries: MoodEntry[];
  onSelectEntry: (entry: MoodEntry) => void;
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ entries, onSelectEntry }) => {
  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Data for the chart
  const chartData = {
    labels: sortedEntries.slice(0, 7).reverse().map(entry => {
      const date = new Date(entry.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        data: sortedEntries.slice(0, 7).reverse().map(entry => entry.scale),
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#4CAF50',
    },
  };

  // Get mood label based on scale
  const getMoodLabel = (scale: number): string => {
    if (scale <= 2) return 'Very Bad';
    if (scale <= 4) return 'Bad';
    if (scale <= 6) return 'Neutral';
    if (scale <= 8) return 'Good';
    return 'Very Good';
  };

  // Render empty state
  if (entries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No mood entries yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {entries.length >= 2 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Your Mood Over Time</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 32}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      )}

      <Text style={styles.historyTitle}>Recent Entries</Text>
      <FlatList
        data={sortedEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.entryItem}
            onPress={() => onSelectEntry(item)}
          >
            <View style={styles.entryHeader}>
              <View style={[styles.moodIndicator, { backgroundColor: getMoodColor(item.scale) }]}>
                <Text style={styles.moodScale}>{item.scale}</Text>
              </View>
              <View style={styles.entryInfo}>
                <Text style={styles.moodText}>{getMoodLabel(item.scale)}</Text>
                <Text style={styles.dateText}>
                  {new Date(item.date).toLocaleString()}
                </Text>
              </View>
            </View>
            <Text style={styles.descriptionText} numberOfLines={2}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Function to get color based on mood scale
const getMoodColor = (scale: number): string => {
  if (scale <= 2) return '#FF5252';
  if (scale <= 4) return '#FFA726';
  if (scale <= 6) return '#FFEB3B';
  if (scale <= 8) return '#9CCC65';
  return '#4CAF50';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  chartContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  entryItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  entryHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  moodIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  moodScale: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  entryInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  moodText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
  },
});

export default MoodHistory;