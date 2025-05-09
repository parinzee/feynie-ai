import Link from "next/link";
import {
  Mic,
  Brain,
  PenTool,
  Sparkles,
  Smile,
  Voicemail,
  Lightbulb,
  BookOpenCheck,
  Github,
  MessageSquare,
  Award,
  PlayCircle,
  Star,
} from "lucide-react";

// Helper component for consistent section padding
const Section = ({
  children,
  className = "",
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) => (
  <section id={id} className={`py-12 md:py-20 ${className}`} style={style}>
    {children}
  </section>
);

// Helper component for feature cards or step cards
const InfoCard = ({
  icon: Icon,
  title,
  description,
  className = "",
}: {
  icon: React.ElementType;
  title: string;
  description:string;
  className?: string;
}) => (
  <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
      <Icon className="w-6 h-6 text-purple-600" />
    </div>
    <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm">{description}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100 text-slate-700 flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-purple-700 hover:text-purple-900 transition-colors">
              Feynie ✨
            </Link>
            <div className="space-x-4 md:space-x-6 flex items-center">
              <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors">
                How it Works
              </Link>
              <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors">
                Features
              </Link>
              <a
                href="https://github.com/parinzee/feynie-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-purple-700 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="flex-grow !pt-12 md:!pt-20 bg-cover bg-center" style={{ backgroundImage: "url('/placeholder-hero-bg.png')"}}> {/* Replace with actual bg if available */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">
                Teach Your Way
              </span>
              <span className="block text-purple-700">to Genius with Feynie!</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Meet Feynie, your personal V-Tuber study buddy! Explain concepts, draw on the whiteboard, and get smart feedback to conquer any subject. Based on the proven Feynman Technique.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/teach" // Assuming a teaching page route
                className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-300 ease-in-out"
              >
                <PlayCircle className="w-5 h-5 mr-2 -ml-1" />
                Start Teaching Now!
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-purple-300 text-base font-medium rounded-lg text-purple-700 bg-white hover:bg-purple-50 transition-colors shadow-md hover:shadow-lg duration-300 ease-in-out"
              >
                Learn How
              </Link>
            </div>
          </div>
          {/* Placeholder for V-Tuber character image */}
          <div className="mt-12 md:mt-16 p-4">
            <div className="relative mx-auto w-full max-w-xl h-64 sm:h-80 md:h-96 bg-gradient-to-tr from-yellow-200 via-orange-200 to-amber-300 rounded-xl shadow-2xl flex items-center justify-center">
              <Smile className="w-24 h-24 text-white opacity-70" />
              <p className="absolute bottom-4 text-sm text-white/80 font-semibold">Feynie Character Showcase Area</p>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section id="how-it-works" className="bg-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 tracking-tight">
              The Learning Game: <span className="text-orange-500">How Feynie Works</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Feynie turns learning into an interactive adventure. Here's your quest:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <InfoCard
              icon={Mic}
              title="1. You Teach"
              description="Pick a topic and explain it in your own words. Feynie listens intently, ready to learn from you!"
            />
            <InfoCard
              icon={MessageSquare}
              title="2. Feynie Questions"
              description="Our curious AI V-Tuber asks clarifying questions, helping you pinpoint areas you need to explore deeper."
            />
            <InfoCard
              icon={PenTool}
              title="3. Whiteboard Wonders"
              description="Illustrate your thoughts! Use the interactive whiteboard to draw diagrams, jot notes, and bring concepts to life."
            />
            <InfoCard
              icon={Award}
              title="4. Unlock Insights"
              description="Get instant feedback! Receive a teaching score, style analysis, and targeted resource suggestions."
            />
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section id="features" className="bg-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Power-Ups</span> for Your Brain!
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Feynie is packed with features to make learning effective and fun.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
             <InfoCard
              icon={Smile}
              title="Interactive V-Tuber"
              description="Engaging anime-style characters (3 to choose!) that react to your explanations."
              className="bg-amber-100/50 border border-amber-300"
            />
            <InfoCard
              icon={Voicemail}
              title="Voice-Powered Learning"
              description="Just talk! Feynie uses advanced speech-to-text. Push-to-talk for easy control."
               className="bg-sky-100/50 border border-sky-300"
            />
            <InfoCard
              icon={Lightbulb}
              title="Smart AI Feedback"
              description="Personalized questions, knowledge gap identification, and teaching effectiveness scores (1-100)."
               className="bg-green-100/50 border border-green-300"
            />
            <InfoCard
              icon={BookOpenCheck}
              title="Feynman Technique Core"
              description="Master concepts by explaining them simply. Feynie guides you through this proven method."
              className="bg-pink-100/50 border border-pink-300"
            />
          </div>
        </div>
      </Section>
      
      {/* Feynman Technique Section */}
      <Section className="bg-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Brain className="w-16 h-16 mx-auto mb-6 text-orange-300" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            The Secret Weapon: The Feynman Technique
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto">
            "If you can't explain it simply, you don't understand it well enough." Feynie embodies this principle. By teaching our AI, you'll quickly uncover gaps in your knowledge, simplify complex ideas, and build true, lasting understanding.
          </p>
        </div>
      </Section>

      {/* Final Call to Action Section */}
      <Section className="bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
            Ready to <span className="text-orange-400">Level Up</span> Your Learning?
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto mb-8">
            Stop passively studying. Start actively teaching with Feynie and unlock your full potential.
            It's fun, effective, and free!
          </p>
          <Link
            href="/teach" // Assuming a teaching page route
            className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-semibold rounded-lg text-purple-700 bg-yellow-400 hover:bg-yellow-300 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300 ease-in-out"
          >
            <Star className="w-6 h-6 mr-2 -ml-1" />
            Start Your First Lesson!
          </Link>
          <p className="mt-10 text-slate-400">
            Feynie is open source!{' '}
            <a
              href="https://github.com/parinzee/feynie-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-orange-400 hover:text-orange-300 underline_always transition-colors inline-flex items-center"
            >
              Star us on GitHub <Github className="w-4 h-4 ml-1.5" />
            </a>
          </p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Feynie AI. All rights reserved (but it's MIT Licensed!).</p>
          <p className="mt-1">
            Built with ❤️ using Next.js, Tailwind CSS, and the power of open source.
          </p>
          <div className="mt-4 space-x-4">
            {/* Placeholder Links */}
            <Link href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-orange-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
