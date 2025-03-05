# Mood Tracker App with AI Insights

A React Native application that allows users to track their mood and receive AI-generated insights using ChatGPT.

## Features

- Record mood on a scale of 1-10
- Add detailed mood descriptions
- Receive AI-generated insights based on mood entries
- View mood history and trends
- Visualize mood changes over time with charts

## Tech Stack

- React Native with TypeScript
- Node.js & Express for backend
- OpenAI API for AI insights
- AsyncStorage for local data persistence
- React Navigation for screen navigation
- React Native Chart Kit for data visualization

## Project Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native development environment set up
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mood-tracker-app.git
cd mood-tracker-app
```

2. Install dependencies for the React Native app
```bash
npm install
```

3. Install dependencies for the Node.js server
```bash
cd server
npm install
```

4. Create a `.env` file in the server directory
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Running the App

1. Start the Node.js server
```bash
cd server
node index.js
```

2. Start the React Native app
```bash
# In a new terminal, from the project root
npx react-native start
```

3. Run on Android or iOS
```bash
# In another terminal
npx react-native run-android
# OR
npx react-native run-ios
```

## Development Approach

This project was built with a focus on:

1. **Clean architecture** - Separating components, screens, and services
2. **TypeScript** - For type safety and better developer experience
3. **Proper error handling** - Validation and user-friendly error messages
4. **Persistence** - Saving mood data locally for history tracking
5. **Data visualization** - Charting mood trends over time

## Challenges Faced

- Setting up the connection between React Native and Node.js server (solved using appropriate IP configuration)
- Managing the async nature of API calls and storage operations
- Implementing responsive UI that works well on different screen sizes
- Optimizing performance for the chart rendering with larger datasets

## Assumptions Made

- Users will have internet connection to get AI insights
- The app is primarily used by a single user on their device
- Simple authentication is sufficient for the MVP (future enhancement)
- Users will check their mood regularly to build meaningful data
