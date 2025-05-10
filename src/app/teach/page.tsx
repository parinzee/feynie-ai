'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Lightbulb, Send } from 'lucide-react';

// Sample topics for inspiration
const SAMPLE_TOPICS = [
  "Quantum Entanglement",
  "Photosynthesis",
  "Black Holes",
  "Neural Networks",
  "The Water Cycle",
  "Climate Change",
  "DNA Replication",
  "Blockchain Technology",
  "Cellular Respiration",
  "Newton's Laws of Motion"
];

export default function TeachPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [character, setCharacter] = useState("professor");
  const [customTopic, setCustomTopic] = useState("");
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combine topic selection (either from samples or custom entry)
    const finalTopic = topic === "custom" ? customTopic : topic;
    
    if (!finalTopic) {
      alert("Please select or enter a topic");
      return;
    }
    
    // Navigate to chat with parameters
    router.push(`/chat?topic=${encodeURIComponent(finalTopic)}&character=${character}`);
  };
  
  // Generate a random sample topic
  const selectRandomTopic = () => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_TOPICS.length);
    setTopic(SAMPLE_TOPICS[randomIndex] || "");
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="mb-8">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold mt-4">Start a Teaching Session</h1>
        <p className="text-muted-foreground">
          Choose a topic and character to begin teaching with the Feynman technique
        </p>
      </header>
      
      <main className="flex-grow max-w-2xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">What would you like to teach?</h2>
            
            {/* Topic selection */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SAMPLE_TOPICS.slice(0, 6).map((sampleTopic) => (
                <Button
                  key={sampleTopic}
                  type="button"
                  variant={topic === sampleTopic ? "default" : "outline"}
                  className="justify-start h-auto py-2 px-3 font-normal"
                  onClick={() => setTopic(sampleTopic)}
                >
                  {sampleTopic}
                </Button>
              ))}
              <Button
                type="button"
                variant={topic === "custom" ? "default" : "outline"}
                className="justify-start h-auto py-2 px-3 font-normal"
                onClick={() => setTopic("custom")}
              >
                Custom Topic
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                className="justify-start h-auto py-2 px-3 font-normal flex items-center"
                onClick={selectRandomTopic}
              >
                <Lightbulb size={16} className="mr-2" />
                Random Topic
              </Button>
            </div>
            
            {/* Custom topic input */}
            {topic === "custom" && (
              <Input
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="Enter your topic..."
                className="mt-3"
              />
            )}
          </div>
          
          {/* Character selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Choose your teaching assistant</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  character === "professor" ? "border-primary bg-primary/10" : "border-muted"
                }`}
                onClick={() => setCharacter("professor")}
              >
                <h3 className="font-semibold">The Professor</h3>
                <p className="text-sm text-muted-foreground">
                  Feynman-inspired character who asks detailed questions
                </p>
              </div>
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  character === "student" ? "border-primary bg-primary/10" : "border-muted"
                }`}
                onClick={() => setCharacter("student")}
              >
                <h3 className="font-semibold">The Student</h3>
                <p className="text-sm text-muted-foreground">
                  Curious learner who helps simplify complex concepts
                </p>
              </div>
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  character === "child" ? "border-primary bg-primary/10" : "border-muted"
                }`}
                onClick={() => setCharacter("child")}
              >
                <h3 className="font-semibold">The Young Learner</h3>
                <p className="text-sm text-muted-foreground">
                  Asks "why" questions that get to the core of concepts
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full flex items-center justify-center" size="lg">
              <Send size={18} className="mr-2" />
              Start Teaching Session
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
} 