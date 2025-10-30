// =====================================
// SIMULATED AI RESPONSES
// =====================================
const AI_RESPONSES = [
  'Interesting! Tell me more.',
  "I'm not sure, but that sounds great!",
  'Hmm, what if we tried a different approach?',
  'I partially understood. Can you explain better?',
  'That makes sense! What else can you share?',
  "I'm learning from our conversation. Continue!",
  'Fascinating perspective! What do you think about...',
  'Let me think about that for a moment...',
];

// =====================================
// FUNCTION: Generate AI Response
// =====================================
export function generateAIResponse(): string {
  const randomIndex = Math.floor(Math.random() * AI_RESPONSES.length);
  return AI_RESPONSES[randomIndex];
}