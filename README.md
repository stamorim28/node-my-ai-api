# Voice Task API (with GPT-5-Nano) 🎤→📋
[![Node.js](https://img.shields.io/badge/Node.js-brightgreen.svg)](https://nodejs.org/docs/latest/api/)
[![OpenAI](https://img.shields.io/badge/OpenAI-blue.svg)](https://platform.openai.com/docs/overview)
[![Multier](https://img.shields.io/badge/Multer-green.svg)](https://github.com/expressjs/multer)

A Node.js API that converts voice commands into structured tasks using OpenAI Whisper and GPT-5-Nano. Perfect for integrating with task management applications like Kanban boards.

Check out [vue-mini-kanban](https://github.com/stamorim28/vue-mini-kanban), the repository using this API.

## ✨ Features

- **🎤 Audio Capture**: Supports WebM audio file uploads
- **📝 Automatic Transcription**: Uses OpenAI Whisper to convert audio to text
- **🤖 Smart Processing**: GPT-5-Nano structures tasks with title, description, and priority
- **📊 Structured Output**: Returns formatted JSON with HTML for easy frontend integration
- **🔒 Security**: Automatically removes sensitive information
- **🌐 CORS Enabled**: Ready for web application integration

## 🛠️ Tech Stack

- **Node.js** + **Express** - Web server
- **Multer** - File upload middleware
- **OpenAI API** - Whisper (transcription) and GPT-5-Nano (processing)
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js 18 or higher
- OpenAI API key
- npm or yarn

## 📡 API Endpoints
### POST /api/voice-task
Processes an audio file and returns a structured task.

- **Headers:** Content-Type: multipart/form-data

- **Body:** audio: Audio file (WebM)

## ⚙️ How to Run

```bash
npm install
```

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

```bash
npm run dev
```

The server will be running at http://localhost:3000
