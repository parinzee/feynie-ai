# Feynie: V-Tuber Teaching Assistant
## Product Requirements Document (100-Hour Implementation Scope)

### 1. Product Overview
---
**Feynie** is an open source web application implementing the Feynman teaching technique with a v-tuber interface. Users verbally teach a concept to a virtual anime-style character who listens, asks questions, and provides feedback - helping users solidify their own understanding through teaching.

### 2. Target Users & Core Value
---
- **Students** preparing for exams
- **Professionals** mastering new concepts
- **Lifelong learners** exploring complex topics

**Core Value:** Transform passive learning into active teaching, exposing knowledge gaps and fostering deeper understanding through explanation.

### 3. Detailed Feature Specifications
---

#### 3.1 User Onboarding
- Simple landing page explaining the Feynman technique
- 3-step tutorial on first launch
- Sample topics to try teaching
- No account required to start using the application

#### 3.2 Voice Interface
- Push-to-talk microphone activation
- Speech-to-text using WebSpeech API
- Audio playback for AI responses via browser audio API
- Basic error handling for unsupported browsers/devices
- 5-second minimum explanation length

#### 3.3 V-Tuber Character
- 3 configurable anime-style characters
  - Classic professor (Feynman-inspired)
  - Friendly female student
  - Curious young learner
- 5 basic emotions (neutral, curious, confused, understanding, excited)
- Lip-sync animation synchronized with audio responses
- Canvas-based rendering optimized for browser performance
- Character selection on initial setup

#### 3.4 Interactive Whiteboard
- Basic drawing tools (pen in 3 colors, eraser, clear all)
- Text tool for labels
- Simple shapes (circle, rectangle, line)
- Shared view visible to both user and AI
- Session persistence (saved with the teaching session)
- Screenshot export functionality

#### 3.5 Teaching Session Flow
- Topic selection/entry
- 2-minute minimum, 10-minute maximum teaching time
- Real-time transcription display (what the AI "hears")
- Interruption questions when AI detects knowledge gaps
- End-of-session feedback and scoring
- Session saving with naming option

#### 3.6 AI Interaction System
- Question generation based on topic and explanation
- 3-5 follow-up questions per session
- Knowledge gap identification in explanations
- Resource suggestion based on detected gaps
- Teaching effectiveness scoring (1-100)
- Teaching style analysis (visual, narrative, technical, analogical)

#### 3.7 Analytics & History
- Session history with dates and scores
- Saved whiteboard snapshots
- Progress tracking across topics
- Exportable results (PNG of score + whiteboard)
- Basic analytics on teaching style and improvement

### 4. Technical Requirements
---
#### 4.1 Frontend
- Using the T3 Stack and Nextjs
- React.js for component structure
- Canvas API for whiteboard functionality
- Basic responsive design (desktop-first, tablet support)
- Minimal dependencies to ensure performance

#### 4.2 Backend & AI
- NextJS server for API endpoints
- Integration with open source LLM through Vercel's AI SDK
- CORS support for API access

#### 4.3 Performance Requirements
- Initial load under 5 seconds on standard broadband
- Voice recognition processing under 2 seconds
- AI response generation under 3 seconds
- Whiteboard response time under 100ms
- Works on Chrome, Firefox, Edge (latest versions)

### 5. User Experience Flow
---
1. **Landing Page**
   - Brief explanation of Feynman technique
   - "Start Teaching" button
   - Sample topics suggestion

2. **Setup Screen**
   - Select/enter topic to teach
   - Choose v-tuber character
   - Microphone permission request

3. **Teaching Interface**
   - V-tuber character (60% of screen)
   - Whiteboard panel (30% of screen)
   - Controls (10% of screen)
   - Push-to-talk button & indicator
   - Timer showing session length

4. **Teaching Session**
   - User explains concept verbally
   - Can draw on whiteboard simultaneously
   - AI listens and occasionally asks clarifying questions
   - Real-time transcription displayed below
   - Session ends manually or at 10-minute mark

5. **Feedback Screen**
   - Teaching score (1-100)
   - Analysis of teaching style
   - Identified knowledge gaps
   - 2-3 resource suggestions
   - Option to save or share results
   - "Teach Again" button

### 6. Development Timeline (100 Hours)

---
#### Phase 1: Foundation (25 hours)
- Basic UI scaffolding (5h)
- Voice input infrastructure (8h)
- Simple whiteboard implementation (7h) 
- Session flow implementation (5h)

#### Phase 2: V-Tuber Character (25 hours)
- Character rendering system (10h)
- Animation framework (8h)
- Emotion system (4h)
- Audio synchronization (3h)

#### Phase 3: AI Implementation (30 hours)
- LLM integration (10h)
- Question generation (7h)
- Teaching analysis (8h)
- Resource recommendation (5h)

#### Phase 4: Polishing & Testing (20 hours)
- Bug fixes and performance optimization (8h)
- Cross-browser testing (4h)
- Documentation (3h)
- Final UI polish (5h)

### 7. Minimum Viable Product Criteria
---
The MVP must include:
- Working voice input and text-to-speech output
- At least one functional v-tuber character
- Basic whiteboard functionality
- Question generation from the AI
- Teaching effectiveness scoring
- Session history saving

### 8. Out of Scope (Future Versions)
---
- User accounts
- Mobile optimization
- Advanced character customization
- Real-time fact checking
- Collaborative teaching sessions
- Subject-specific question templates
- Integration with learning management systems
- Full offline functionality

### 9. Success Metrics
---
- Average session length > 3 minutes
- Return usage rate > 30%
- Teaching score improvement over sessions
- Social shares of results
- GitHub stars and contributor growth
- Number of saved teaching sessions

### 10. Open Source Strategy
---
- MIT License
- Well-documented codebase
- Contributor guidelines focused on:
  - New character designs
  - Improved AI prompting
  - Subject-specific question sets
  - Localization support
- Community showcase for teaching examples