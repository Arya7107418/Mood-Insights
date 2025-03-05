// src/types/index.ts
export interface MoodEntry {
    id: string;
    scale: number;
    description: string;
    date: string;
    insight?: string;
  }

  export type RootStackParamList = {
    Home: undefined;
    History: undefined;
}