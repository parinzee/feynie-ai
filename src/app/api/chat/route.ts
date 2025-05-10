import { streamText } from 'ai';
import { AIService, type ModelOption } from '~/services/llm-service';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Configure request handling
export async function POST(req: Request) {
  try {
    // Parse request body
    const { messages, model = 'openai-gpt4o', persona = 'FEYNIE_ASSISTANT', temperature = 0.7 } = await req.json();

    // Get model provider and system prompt based on specified options
    const modelProvider = AIService.getProvider(model as ModelOption);
    const systemPrompt = AIService.getSystemPrompt(persona);
    
    // Create streaming response
    const result = await streamText({
      model: modelProvider,
      messages,
      system: systemPrompt,
      temperature,
      maxTokens: 1500, // Reasonable length for educational explanations
    });

    const streamResponse = result.toDataStreamResponse();

    return streamResponse;
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(
      JSON.stringify({
        error: 'An error occurred while processing your request',
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 