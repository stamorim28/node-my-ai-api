# Voice Task API (com GPT-5-Nano) 🎤→📋
[![Node.js](https://img.shields.io/badge/Node.js-brightgreen.svg)](https://nodejs.org/docs/latest/api/)
[![OpenAI](https://img.shields.io/badge/OpenAI-blue.svg)](https://platform.openai.com/docs/overview)
[![Multier](https://img.shields.io/badge/Multer-green.svg)](https://github.com/expressjs/multer)

Uma API Node.js que converte comandos de voz em tarefas estruturadas usando OpenAI Whisper e GPT-5-Nano. Perfeito para integrar com aplicações de gerenciamento de tarefas como Kanban boards.

Confira também o [vue-mini-kanban](https://github.com/stamorim28/vue-mini-kanban), repositório que está usando essa API.

## ✨ Funcionalidades

- **🎤 Captura de Áudio**: Suporte a upload de arquivos de áudio em formato WebM
- **📝 Transcrição Automática**: Utiliza OpenAI Whisper para converter áudio em texto
- **🤖 Processamento Inteligente**: GPT-5-Nano estrutura as tarefas com título, descrição e prioridade
- **📊 Saída Estruturada**: Retorna JSON formatado com HTML para fácil integração frontend
- **🔒 Segurança**: Remove informações sensíveis automaticamente
- **🌐 CORS Habilitado**: Pronto para integração com aplicações web

## 🛠️ Tecnologias

- **Node.js** + **Express** - Servidor web
- **Multer** - Middleware para upload de arquivos
- **OpenAI API** - Whisper (transcrição) e GPT-5-Nano (processamento)
- **CORS** - Cross-origin resource sharing

## 📋 Pré-requisitos

- Node.js 18 ou superior
- Chave da API OpenAI
- npm ou yarn

## 📡 API Endpoints
### POST /api/voice-task
Processa um arquivo de áudio e retorna uma tarefa estruturada.

- **Headers:** Content-Type: multipart/form-data

- **Body:** audio: Arquivo de áudio (WebM)

## ⚙️ Como Executar

```bash
npm install
```

```env
OPENAI_API_KEY=sua_chave_openai_aqui
PORT=3000
```

```bash
npm run dev
```

O servidor estará rodando em http://localhost:3000
