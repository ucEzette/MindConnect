const axios = require('axios');

class AIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
  }

  async getChatResponse(userMessage, conversationHistory = []) {
    try {
      const messages = [
        {
          role: 'system',
          content: `You are a compassionate mental health support assistant. Provide empathetic responses, encourage professional help when needed, detect crisis situations, never diagnose or prescribe, and be warm and non-judgmental. If crisis detected, recommend emergency services.`
        },
        ...conversationHistory,
        { role: 'user', content: userMessage }
      ];

      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        response: response.data.choices[0].message.content,
        isCrisis: this.detectCrisis(userMessage),
        timestamp: new Date()
      };
    } catch (error) {
      console.error('AI Service error:', error.message);
      return {
        response: "I'm experiencing technical difficulties. Please contact a crisis helpline if you need immediate help: Call 988 (US) or your local emergency services.",
        isCrisis: false,
        timestamp: new Date()
      };
    }
  }

  detectCrisis(message) {
    const crisisKeywords = [
      'suicide', 'kill myself', 'want to die', 'end my life',
      'self harm', 'hurt myself', 'no reason to live',
      'better off dead', 'suicide plan'
    ];
    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  }
}

module.exports = new AIService();
