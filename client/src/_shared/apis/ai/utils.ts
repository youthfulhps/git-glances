/**
 * Parse AI response, handling code blocks and extra formatting
 */
export const parseAIResponse = <T>(text: string): T => {
  let cleanedText = text.trim();

  // Remove markdown code blocks if present (```json ... ``` or ``` ... ```)
  const codeBlockMatch = cleanedText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    cleanedText = codeBlockMatch[1].trim();
  }

  return JSON.parse(cleanedText);
};
