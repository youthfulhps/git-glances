import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';
import {
  SummarizeRepository,
  GenerateContributionInsight,
  GenerateCodeReview,
  GenerateLanguageInsight,
  GenerateDeveloperPersona,
} from './types';
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

export const generateLanguageInsight: GenerateLanguageInsight = async ({
  languages,
  totalRepos,
  topLanguage,
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

  const topLanguages = languages.slice(0, 5);
  const languageBreakdown = topLanguages
    .map(
      (lang) =>
        `- ${lang.name}: ${lang.percentage.toFixed(1)}% (${lang.repoCount} repos, ${(lang.totalSize / 1000000).toFixed(1)}MB)`
    )
    .join('\n');

  const prompt = `Analyze this developer's programming language usage across their GitHub repositories and provide insights:

Total Repositories: ${totalRepos}
Top Language: ${topLanguage}

Language Breakdown:
${languageBreakdown}

Provide a personalized insight that:
1. Interprets the language distribution (e.g., "Your polyglot approach shows versatility" or "Strong TypeScript focus indicates modern web development")
2. Highlights interesting patterns (e.g., "Balanced backend/frontend split" or "Heavily frontend-focused")
3. Gives one actionable recommendation for skill development or exploration

Return ONLY a valid JSON object with this exact format:
{
  "insight": "2-3 sentences analyzing the pattern and giving advice",
  "tags": ["keyword1", "keyword2", "keyword3"]
}

Tags should reflect the development style (e.g., "polyglot", "web-development", "backend-focused", "full-stack", "modern-javascript").`;

  const { text } = await generateText({
    model: groq('llama-3.3-70b-versatile'),
    prompt,
    system:
      'You are a technical career advisor that analyzes programming language usage. Always respond with valid JSON only, no additional text. Be encouraging and provide actionable insights.',
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

export const generateDeveloperPersona: GenerateDeveloperPersona = async ({ events, username }) => {
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

  // Analyze activity patterns
  const eventsByDay: Record<string, number> = {};
  const eventsByHour: Record<number, number> = {};
  const eventTypes: Record<string, number> = {};
  let weekdayEvents = 0;
  let weekendEvents = 0;

  events.forEach((event) => {
    const date = new Date(event.created_at);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const hour = date.getHours();
    const dayOfWeek = date.getDay();

    eventsByDay[dayName] = (eventsByDay[dayName] || 0) + 1;
    eventsByHour[hour] = (eventsByHour[hour] || 0) + 1;
    eventTypes[event.type] = (eventTypes[event.type] || 0) + 1;

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendEvents++;
    } else {
      weekdayEvents++;
    }
  });

  const mostActiveDay = Object.entries(eventsByDay).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';
  const mostActiveHour = Object.entries(eventsByHour).sort((a, b) => b[1] - a[1])[0]?.[0] || 0;
  const topEventType = Object.entries(eventTypes).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

  const timeOfDay =
    Number(mostActiveHour) < 6
      ? 'Late Night (12am-6am)'
      : Number(mostActiveHour) < 12
        ? 'Morning (6am-12pm)'
        : Number(mostActiveHour) < 18
          ? 'Afternoon (12pm-6pm)'
          : 'Evening (6pm-12am)';

  const weekdayPercentage = ((weekdayEvents / (weekdayEvents + weekendEvents)) * 100).toFixed(0);

  const prompt = `Analyze this GitHub user's activity pattern and assign them a creative developer persona:

Username: ${username}
Total Events: ${events.length}
Most Active Day: ${mostActiveDay}
Most Active Time: ${timeOfDay}
Top Activity Type: ${topEventType}
Weekday Activity: ${weekdayPercentage}%
Weekend Activity: ${100 - Number(weekdayPercentage)}%

Based on these patterns, create a fun and accurate developer persona. Examples of good personas:
- "Night Owl Coder" - for developers who code late at night
- "Weekend Warrior" - for those who code heavily on weekends
- "Early Bird Developer" - for morning coders
- "PR Review Master" - for those who focus on reviews
- "Commit Machine" - for prolific committers
- "Steady Eddie" - for consistent daily contributors

Return ONLY a valid JSON object with this exact format:
{
  "persona": "A catchy 2-4 word persona name",
  "description": "A fun 1-2 sentence description of what this persona means",
  "traits": ["trait1", "trait2", "trait3"],
  "stats": {
    "mostActiveDay": "${mostActiveDay}",
    "mostActiveTime": "${timeOfDay}",
    "weekdayVsWeekend": "${weekdayPercentage}% weekday"
  }
}

Traits should be positive characteristics (e.g., "Late night productivity", "Weekend dedication", "Consistent contributor").`;

  const { text } = await generateText({
    model: groq('llama-3.3-70b-versatile'),
    prompt,
    system:
      'You are a creative developer profiler that creates fun, accurate personas based on GitHub activity patterns. Always respond with valid JSON only, no additional text. Be creative and engaging while staying accurate to the data.',
  });

  try {
    const parsed = parseAIResponse<{
      persona: string;
      description: string;
      traits: string[];
      stats: { mostActiveDay: string; mostActiveTime: string; weekdayVsWeekend: string };
    }>(text);
    return {
      data: {
        persona: parsed.persona,
        description: parsed.description,
        traits: parsed.traits || [],
        stats: parsed.stats,
      },
    };
  } catch (error) {
    console.error('Failed to parse AI response:', text);
    throw new Error('Invalid response format from AI');
  }
};
