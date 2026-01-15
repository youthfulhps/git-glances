import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';
import { SummarizeRepository } from './types';

export const summarizeRepository: SummarizeRepository = async (
  repositoryName,
  description,
) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured');
  }

  const groq = createOpenAICompatible({
    name: 'groq',
    baseURL: 'https://api.groq.com/openai/v1',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const prompt = `Analyze this GitHub repository and provide a summary with relevant tags:
Repository: ${repositoryName}
Description: ${description || 'No description'}

Return ONLY a valid JSON object with this exact format:
{
  "summary": "A concise 1-2 sentence summary explaining what it does and where/how it can be used",
  "tags": ["tag1", "tag2", "tag3"]
}

Provide 3-5 relevant technology tags (e.g., React, TypeScript, CLI, Web).`;

  const { text } = await generateText({
    model: groq('llama-3.3-70b-versatile'),
    prompt,
    system:
      'You are a helpful assistant that analyzes GitHub repositories. Always respond with valid JSON only, no additional text.',
  });

  try {
    const parsed = JSON.parse(text);
    return {
      data: {
        summary: parsed.summary,
        tags: parsed.tags || [],
      },
    };
  } catch (error) {
    console.error('Failed to parse AI response:', text);
    throw new Error('Invalid response format from AI');
  }
};
