import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';
import { SummarizeRepository, GenerateContributionInsight, GenerateCodeReview } from './types';
import { parseAIResponse } from './utils';

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
    const parsed = parseAIResponse<{ summary: string; tags: string[] }>(text);
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

export const generateContributionInsight: GenerateContributionInsight = async ({
  totalCommits,
  totalPRs,
  totalReviews,
  totalIssues,
  period,
}) => {
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

  const prompt = `Analyze this developer's GitHub contribution data and provide AI-powered productivity insights:

Period: ${period}
Total Commits: ${totalCommits}
Total Pull Requests: ${totalPRs}
Total Reviews: ${totalReviews}
Total Issues: ${totalIssues}

Provide a personalized insight that:
1. Interprets the contribution pattern (e.g., "You focused heavily on code reviews" or "Strong commit activity shows active development")
2. Compares different contribution types (e.g., "Your review activity is 2x higher than PRs, showing strong team collaboration")
3. Gives one actionable recommendation for improvement or balance

Return ONLY a valid JSON object with this exact format:
{
  "insight": "2-3 sentences analyzing the pattern and giving advice",
  "tags": ["keyword1", "keyword2", "keyword3"]
}

Tags should reflect the contribution style (e.g., "collaboration", "active-development", "code-review", "frontend", "backend").`;

  const { text } = await generateText({
    model: groq('llama-3.3-70b-versatile'),
    prompt,
    system:
      'You are a developer productivity coach that analyzes GitHub contributions. Always respond with valid JSON only, no additional text. Be encouraging but honest.',
  });

  try {
    const parsed = parseAIResponse<{ insight: string; tags: string[] }>(text);
    return {
      data: {
        insight: parsed.insight,
        tags: parsed.tags || [],
      },
    };
  } catch (error) {
    console.error('Failed to parse AI response:', text);
    throw new Error('Invalid response format from AI');
  }
};

export const generateCodeReview: GenerateCodeReview = async ({ diff, commitMessage, prTitle }) => {
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

  const contextInfo = [];
  if (commitMessage) contextInfo.push(`Commit Message: ${commitMessage}`);
  if (prTitle) contextInfo.push(`PR Title: ${prTitle}`);

  const prompt = `Review this code change and provide a detailed code review:

${contextInfo.length > 0 ? contextInfo.join('\n') + '\n\n' : ''}Code Diff:
${diff}

Analyze the code changes and provide:
1. Overall assessment (what does this change accomplish?)
2. Specific findings categorized by type (bugs, security issues, performance concerns, style issues, improvements)
3. A summary with key recommendations

Return ONLY a valid JSON object with this exact format:
{
  "review": "Overall assessment of the changes (2-3 sentences)",
  "findings": [
    {
      "type": "bug|security|performance|style|improvement",
      "severity": "high|medium|low",
      "message": "Detailed description of the finding"
    }
  ],
  "summary": "Key takeaway and main recommendation"
}

Focus on:
- Potential bugs or logic errors
- Security vulnerabilities (SQL injection, XSS, authentication issues, etc.)
- Performance concerns (inefficient loops, unnecessary re-renders, memory leaks)
- Code quality and best practices
- Positive aspects worth highlighting

If the code looks good, include positive findings with type "improvement" and low severity.`;

  const { text } = await generateText({
    model: groq('llama-3.3-70b-versatile'),
    prompt,
    system:
      'You are an experienced senior software engineer conducting a code review. Always respond with valid JSON only, no additional text. Be thorough, constructive, and balanced in your feedback.',
  });

  try {
    const parsed = parseAIResponse<{
      review: string;
      findings: Array<{ type: string; severity: string; message: string }>;
      summary: string;
    }>(text);
    return {
      data: {
        review: parsed.review,
        findings: parsed.findings || [],
        summary: parsed.summary,
      },
    };
  } catch (error) {
    console.error('Failed to parse AI response:', text);
    throw new Error('Invalid response format from AI');
  }
};
