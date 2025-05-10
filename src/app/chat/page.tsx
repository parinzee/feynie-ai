'use client';

import { useChat } from '@ai-sdk/react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { ScrollArea } from '~/components/ui/scroll-area';
import { SendHorizonal, User, Bot, Settings, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef, useState } from 'react';
import { getModelDisplayName, type ModelOption, createTeachingPrompt } from '~/services/llm-service';
import { useSearchParams } from 'next/navigation';

export default function ChatPage() {
  const searchParams = useSearchParams();
  
  // Get URL parameters for teaching session
  const topicParam = searchParams.get('topic');
  const characterParam = searchParams.get('character');
  
  // State for settings panel
  const [showSettings, setShowSettings] = useState(false);
  
  // AI settings state
  const [model, setModel] = useState<ModelOption>('local-gemma3');
  const [persona, setPersona] = useState<string>(
    characterParam === 'student' ? 'CURIOUS_STUDENT' : 
    characterParam === 'child' ? 'CURIOUS_STUDENT' : // Using same prompt but could be customized
    'FEYNIE_ASSISTANT'
  );
  const [temperature, setTemperature] = useState(0.7);
  
  // Initialize chat with settings
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, setInput } = useChat({
    body: {
      model,
      persona,
      temperature
    }
  });
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Clear chat function
  const handleClearChat = () => {
    setMessages([]);
  };

  // Initialize with topic if provided
  useEffect(() => {
    if (topicParam && messages.length === 0) {
      const teachingPrompt = createTeachingPrompt(topicParam);
      setInput(teachingPrompt);
    }
  }, [topicParam, messages.length, setInput]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="p-4 border-b shadow-sm sticky top-0 bg-background z-10 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {topicParam ? `Teaching: ${topicParam}` : 'Feynie AI Chat'}
        </h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Settings"
          >
            <Settings size={20} />
          </Button>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b bg-muted/20">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">Chat Settings</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)}>
                <X size={18} />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Model</label>
                <select 
                  className="w-full p-2 border rounded bg-background"
                  value={model}
                  onChange={(e) => setModel(e.target.value as ModelOption)}
                >
                  <option value="openai-gpt4o">GPT-4o</option>
                  <option value="openai-gpt3.5turbo">GPT-3.5 Turbo</option>
                  <option value="google-gemini-pro">Gemini Pro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Persona</label>
                <select 
                  className="w-full p-2 border rounded bg-background"
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                >
                  <option value="FEYNIE_ASSISTANT">Teaching Assistant</option>
                  <option value="CURIOUS_STUDENT">Curious Student</option>
                  <option value="CRITIC">Critical Reviewer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Temperature: {temperature.toFixed(1)}
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="mt-3 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearChat}
              >
                Clear Chat
              </Button>
            </div>
          </div>
        </div>
      )}

      <ScrollArea className="flex-grow p-4 md:p-6" ref={scrollAreaRef}>
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Bot size={40} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Welcome to Feynie AI!</h3>
              <p className="max-w-md mx-auto">
                {topicParam 
                  ? `I'm ready to learn about ${topicParam}! Start teaching me and I'll ask questions to help you develop your understanding.`
                  : "I'm here to help you learn using the Feynman technique. Start by teaching me about a concept you're studying, and I'll ask questions to deepen your understanding."
                }
              </p>
            </div>
          )}
          {messages.map(m => (
            <div key={m.id} className={`flex items-start space-x-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && (
                <Avatar className="h-8 w-8 self-start">
                  <AvatarFallback><Bot size={20} /></AvatarFallback>
                </Avatar>
              )}
              <div 
                className={`p-3 rounded-lg shadow-sm max-w-[75%] prose prose-sm dark:prose-invert prose-p:my-1 prose-headings:my-2 prose-pre:bg-muted prose-pre:p-3 prose-pre:rounded-md prose-pre:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-[''] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  ${m.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }`
                }
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.content}
                </ReactMarkdown>
              </div>
              {m.role === 'user' && (
                <Avatar className="h-8 w-8 self-start">
                  <AvatarFallback><User size={20} /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <footer className="p-4 border-t sticky bottom-0 bg-background z-10">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-center space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={topicParam 
              ? `Teach Feynie about ${topicParam}...` 
              : "Teach Feynie about a concept..."
            }
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <SendHorizonal size={20} />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
        {model !== 'openai-gpt4o' && (
          <div className="max-w-3xl mx-auto mt-2">
            <p className="text-xs text-muted-foreground">
              Currently using {getModelDisplayName(model)}
            </p>
          </div>
        )}
      </footer>
    </div>
  );
} 