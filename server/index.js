// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Add your API key to a .env file
});

// API endpoint for getting AI insights
app.post('/api/insight', async (req, res) => {
  try {
    const { scale, description } = req.body;
    
    if (!scale || !description) {
      return res.status(400).json({ error: 'Scale and description are required' });
    }

    // Construct prompt for ChatGPT
    const prompt = `
      The user has logged their mood as ${scale}/10 and described it as: "${description}".
      
      Based on this information, provide a thoughtful insight about their mood,
      possible causes, and a helpful suggestion to improve their wellbeing.
      Keep the response concise (max 4 sentences) and supportive.
    `;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful and empathetic mood assistant." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    // Extract and send response
    const insight = completion.choices[0].message.content.trim();
    res.json({ insight });
  } catch (error) {
    console.error('Error getting AI insight:', error);
    res.status(500).json({ error: 'Failed to get AI insight' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});