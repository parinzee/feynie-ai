# Fenyie AI: A Teaching Platform Where AI Acts as Your Student

## Project Overview

Fenyie AI is an innovative teaching platform where artificial intelligence takes on the role of a student. The platform allows users to teach the AI, which in turn asks questions, engages in discussions, and demonstrates learning. This educational approach provides a unique interactive experience, offering users the opportunity to reinforce their own knowledge through teaching while interacting with an AI avatar.

## Key Components

The Fenyie AI project involves several technical components that work together to create an engaging educational experience:

### 1. Visual Interface (VTuber Model)

The visual representation of the AI student uses Live2D technology:

- **Live2D Cubism**: Industry-standard software for creating 2D animations with dynamic expressions from a single illustration
- **Model Options**:
  - Anya: [https://booth.pm/en/items/5247208](https://booth.pm/en/items/5247208)
  - Camellya (Wuthering Waves): [https://booth.pm/en/items/6313490](https://booth.pm/en/items/6313490)
  - Ellot (Male): [https://booth.pm/en/items/4862237](https://booth.pm/en/items/4862237)
  - Ellen Joe: [https://booth.pm/en/items/5966423](https://booth.pm/en/items/5966423)

Live2D provides a more engaging and personalized learning experience by giving the AI student a visual presence. The technology allows for facial expressions, movements, and animations that make interactions more natural and engaging.

### 2. Language Model (LLM)

The AI's intelligence and conversational abilities are powered by an edge-deployable Large Language Model:

- **Gemma Family**: Google's open-source LLMs designed for edge deployment
  - Gemma 3 (1B, 4B, 27B): Latest iteration with impressive performance despite smaller size
  - Optimized for single GPU/TPU deployment
  - State-of-the-art performance in its size class
  - Multi-language support
  - 128k token context window

- **Alternative Options**:
  - Llama 3.2 (1B, 3B variants): Meta's edge-optimized models
  - Performance comparison: Gemma 3 excels in math and coding, while Llama 3.2 performs better on general knowledge benchmarks

These lightweight but powerful models allow the AI student to generate intelligent responses, ask relevant questions, and engage in educational discussions while running efficiently on consumer hardware.

### 3. Text-to-Speech (TTS)

To give the AI student a voice, the project incorporates text-to-speech technology:

- **Kokoro-82M**: A lightweight but high-quality TTS option
  - Only 82 million parameters but delivers quality comparable to larger models
  - Supports multiple languages
  - Real-time processing capabilities
  - Apache-licensed for commercial and personal use
  - Efficient deployment on edge devices
  - Based on StyleTTS 2 architecture

- **Alternative Options**:
  - Dia-1.6B: Supports voice cloning and emotions but requires more resources (but I heavily like this one)
  - CSM 1B: Another option with good quality-to-size ratio
  - Silero TTS: Enterprise-grade TTS with good performance on CPU

The TTS component allows the AI student to communicate verbally, making the teaching experience more immersive and natural.

### 4. Automatic Speech Recognition (ASR)

To understand user speech, the project requires ASR capabilities:

- **Primary Options**:
  - Parakeet-tdt-0.6B-v2: NVIDIA's state-of-the-art ASR model
    - 600 million parameters
    - Outperforms many larger models including Whisper-large-v3
    - Supports automatic punctuation, capitalization, and timestamp prediction
    - Highly efficient (can transcribe an hour of audio in one second)

  - Whisper-large-v3-turbo: OpenAI's optimized ASR model
    - 809 million parameters
    - Reduced number of decoding layers (from 32 to 4) for faster performance
    - Multilingual capabilities
    - Small quality degradation compared to full Whisper-large-v3

The ASR component enables natural voice interaction between users and the AI student, allowing for a more intuitive teaching experience.

### 5. Voice Activity Detection (VAD)

For managing conversations and interruptions naturally:

- **Silero VAD**: Pre-trained enterprise-grade Voice Activity Detector
  - Excellent accuracy in detecting speech vs. non-speech
  - Fast processing (under 1ms for a 30ms audio chunk)
  - Small model size (around 2MB)
  - Trained on over 6000 languages
  - Support for 8kHz and 16kHz sampling rates
  - MIT-licensed with no usage restrictions

The VAD system allows for natural turn-taking in conversations, making interactions with the AI student more realistic and engaging.

### 6. Inference Server

To coordinate all these components and ensure efficient processing:

- **VLLM**: High-throughput inference engine for LLMs
- **SGLang**: Alternative inference framework

These inference servers optimize the performance of the language models, ensuring responsive interactions with the AI student.

## Implementation Architecture

The overall architecture connects these components in a pipeline:

1. **User Input**: Voice captured through microphone (ASR) or text input
2. **Voice Activity Detection**: Silero VAD processes audio to detect when the user is speaking
3. **Speech Recognition**: Converts user speech to text using Parakeet or Whisper
4. **Language Processing**: The LLM (Gemma/Llama) processes user input and generates appropriate responses
5. **Voice Synthesis**: TTS (Kokoro-82M / CSM) converts the generated text to speech
6. **Visual Representation**: Live2D model animates in sync with the generated speech

### Integration Challenges

- **Latency Management**: Ensuring real-time response between components
- **Animation Synchronization**: Coordinating facial movements with speech
- **Interruption Handling**: Using VAD to manage natural conversation flow
- **Resource Efficiency**: Balancing component sizes for optimal performance on consumer hardware

## Server Hardware Requirements

Based on the selected components, a system with the following specifications should be sufficient:

- **GPU**: NVIDIA 3090Ti or equivalent
- **RAM**: 16GB minimum, 32GB recommended
- **Storage**: 10GB for models and application
- **OS**: Windows/Linux/macOS with appropriate drivers