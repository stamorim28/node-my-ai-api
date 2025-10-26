import express from "express";
import multer from "multer";
import cors from "cors";
import OpenAI from "openai";
import "dotenv/config";

const app = express();
const upload = multer();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/voice-task", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "Nenhum áudio recebido." });

    console.log("🎧 Recebendo áudio, iniciando transcrição...");

    console.log("🗂️ Tipo:", req.file.mimetype);
    console.log("📏 Tamanho:", req.file.size, "bytes");
    const audioFile = new File([req.file.buffer], "voice.webm", {
      type: "audio/webm",
    });

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    });

    const text = transcription.text?.trim();
    if (!text) throw new Error("Transcrição vazia");
    console.log("📝 Transcrição:", text);

    const prompt = `
Você é um assistente que transforma instruções verbais em tarefas estruturadas prontas para uso em interfaces web.

Gere exatamente um objeto JSON válido com esta estrutura:
{
  "title": "<h2>Título curto da tarefa</h2>",
  "description": "<div>Descrição detalhada com formatação HTML; use tags como <p>, <ul>, <li>, <strong>, <em>, <br> quando apropriado</div>",
  "priority": "low" | "medium" | "high"
}

Regras de extração e formatação
- **Título**: curta expressão resumindo a ação; envolva com uma tag de título HTML apropriada como &lt;h2&gt; ou &lt;h3&gt;; máximo 8 palavras.
- **Descrição**: parágrafo inicial conciso seguido de lista com passos ou critérios quando fizer sentido; mantenha HTML limpo e sem atributos inline.
- **Prioridade**: escolha entre low, medium ou high baseado em urgência e impacto explícitos ou implícitos no texto falado.
- **Saída**: retorne apenas o JSON, sem texto adicional, sem explicações e sem quebras de linha dentro dos valores além das necessárias para HTML válido.
- **Segurança**: remova informações sensíveis encontradas no texto; substitua por "[removido]" quando necessário.

Exemplos de saída esperada
- Entrada falada: "Arrumar a reunião com o cliente amanhã e enviar a proposta até terça"
- JSON gerado:
{
  "title": "<h2>Agendar reunião com cliente</h2>",
  "description": "<p>Marcar data e enviar proposta.</p><ul><li>Confirmar disponibilidade do cliente</li><li>Preparar proposta com preços</li><li>Enviar por e-mail e pedir confirmação</li></ul>",
  "priority": "high"
}

Texto falado pelo usuário:
"""${text}"""
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [{ role: "user", content: prompt }],
      // temperature: 0.5,
    });

    const resultText = completion.choices[0].message.content;
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);

    const task = jsonMatch
      ? JSON.parse(jsonMatch[0])
      : {
          title: "Tarefa não identificada",
          description: text,
          priority: "medium",
        };

    console.log("✅ Tarefa gerada:", task);

    res.json({
      transcript: text,
      task,
    });
  } catch (err) {
    console.error("❌ Erro no processamento de áudio:", err);
    res
      .status(500)
      .json({ error: "Erro ao processar o áudio e gerar a tarefa." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);
