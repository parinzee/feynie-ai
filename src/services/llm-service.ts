// LLM service for Feynie's teaching assistant AI
// This service handles AI model configuration, prompting, and response processing

import { openai, createOpenAI } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { createOllama, ollama as _ollama } from 'ollama-ai-provider';

// Define our own AIModelProvider type since it's not exported from 'ai'
type AIModelProvider = ReturnType<typeof openai> | ReturnType<typeof google> | ReturnType<typeof _ollama>;

// Model options available for Feynie
export type ModelOption = 'openai-gpt4o' | 'google-gemini-pro' | 'local-gemma3';

// System prompts designed for Feynie's teaching assistant role
export const SYSTEM_PROMPTS = {
  FEYNIE_ASSISTANT: `You are Feynie, an educational teaching assistant that uses the Feynman technique. 
Your job is to listen to the user's explanation of a concept, ask clarifying questions, 
and help identify knowledge gaps in their understanding.

Follow these principles:
1. Ask thoughtful questions that probe the user's understanding
2. Identify when explanations use jargon or complex terms without explanation
3. Point out logical inconsistencies in their reasoning
4. Suggest analogies or simpler ways to explain complex ideas
5. Be encouraging and supportive
6. Remember that your goal is to help the user improve their understanding by teaching you`,

  CURIOUS_STUDENT: `You are Feynie, a curious student eager to learn. 
Your role is to ask questions about the topic the user is teaching you.
You should act as a student who knows nothing about the topic and asks questions to the user.
Use markdown and be expressive.
Be genuinely interested, ask for clarification when needed, and show enthusiasm.
Occasionally ask challenging questions that make the user think deeper about the concept.`,

  CRITIC: `You are Feynie, a critical reviewer of explanations.
Your job is to analyze the user's teaching and provide constructive feedback.
Point out where explanations are unclear, identify knowledge gaps,
and suggest improvements to make concepts more understandable.`
};

// Default model configuration
export const DEFAULT_MODEL_CONFIG = {
  model: 'openai-gpt4o',
  systemPrompt: SYSTEM_PROMPTS.FEYNIE_ASSISTANT,
  temperature: 0.7,
  maxTokens: 1000
};


// Maps model options to their actual AI SDK providers
const ollama = createOllama({
  baseURL: 'http://edge-foobox:11434/',
});

const customOpenai = createOpenAI({
  baseURL: 'http://edge-foobox:30000/v1',
  apiKey: 'sk-1234-test',
  compatibility: 'compatible'
});

export function getModelProvider(modelOption: ModelOption): AIModelProvider {
  switch (modelOption) {
    case 'openai-gpt4o':
      return openai('gpt-4o');
    case 'local-gemma3':
      // return ollama('gemma3:27b-it-qat');
      return customOpenai('ISTA-DASLab/gemma-3-27b-it-GPTQ-4b-128g');
    case 'google-gemini-pro':
      return google('gemini-1.5-pro');
    default:
      return openai('gpt-4o'); // Default fallback
  }
}

// Utility to get model display name for UI
export function getModelDisplayName(modelOption: ModelOption): string {
  switch (modelOption) {
    case 'openai-gpt4o':
      return 'GPT-4o';
    case 'local-gemma3':
      return 'Gemma 3';
    case 'google-gemini-pro':
      return 'Gemini Pro';
    default:
      return 'Unknown Model';
  }
}

// Create prompt templates for specific teaching scenarios
export function createTeachingPrompt(topic: string): string {
  return `I'm trying to learn about ${topic}. Please ask me questions to help me understand it better.`;
}

export function createFeedbackPrompt(transcript: string): string {
  return `I just taught a concept with this transcript: "${transcript}". Please analyze my explanation and provide feedback on clarity, completeness, and accuracy.`;
}

// Main service object with methods for interacting with AI models
export const AIService = {
  /**
   * Gets model provider for the specified model option
   */
  getProvider(modelOption: ModelOption = 'openai-gpt4o'): AIModelProvider {
    return getModelProvider(modelOption);
  },

  /**
   * Gets system prompt for the specified persona
   */
  getSystemPrompt(persona: keyof typeof SYSTEM_PROMPTS = 'FEYNIE_ASSISTANT'): string {
    return SYSTEM_PROMPTS[persona];
  },

  /**
   * Creates configuration object for AI requests
   */
  createConfig(options: {
    modelOption?: ModelOption;
    systemPrompt?: string;
    temperature?: number;
    maxTokens?: number;
  }) {
    return {
      model: this.getProvider(options.modelOption || 'openai-gpt4o'),
      system: options.systemPrompt || SYSTEM_PROMPTS.FEYNIE_ASSISTANT,
      temperature: options.temperature ?? 0.7,
      maxTokens: options.maxTokens ?? 1000
    };
  }
};

// console.log('AI Service Loaded'); 