import axios from "axios";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { ENV } from "../libs/env.js";

const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1-nano";

const guessTheOutputClient = ModelClient(
  endpoint,
  new AzureKeyCredential(ENV.AI_GUESS_THE_OUTPUT_API)
);

const regexRushClient = ModelClient(
  endpoint,
  new AzureKeyCredential(ENV.AI_REGEX_RUSH_API)
); 

const typingSpeedClient = ModelClient(
  endpoint,
  new AzureKeyCredential(ENV.AI_TYPING_SPEED_TEST_API)
);

const bugHuntClient = ModelClient(
  endpoint,
  new AzureKeyCredential(ENV.AI_BUG_HUNT_API)
);

const binaryClickerClient = ModelClient(
  endpoint,
  new AzureKeyCredential(ENV.AI_BINARY_CLICKER_API)
);

const shortcutNinjaClient = ModelClient(
  endpoint,
  new AzureKeyCredential(ENV.AI_SHORTCUT_NINJA_API)
);

const emojiPictionaryClient = ModelClient(
  endpoint,
  new AzureKeyCredential(ENV.AI_EMOJI_PICTIONARY_API)
);



export const guessTheOutput = async (req, res) => {
  const language = req.query.language || "javascript";

  const prompt = `
You are generating a "Guess the Output" coding question.

Rules:
- Give a TRICKY ${language} code snippet
- Output MUST be correct
- Distractors must be realistic but wrong
- Respond in PURE JSON ONLY (no markdown, no explanation)

JSON format:
{
  "code": "code snippet here",
  "correct": "correct output",
  "distractors": ["wrong1", "wrong2", "wrong3"]
}
`;

  try {
    const response = await guessTheOutputClient
      .path("/chat/completions")
      .post({
        body: {
          model,
          temperature: 1,
          top_p: 1,
          messages: [
            { role: "system", content: "You are an expert programming quiz generator." },
            { role: "user", content: prompt }
          ]
        }
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    let raw = response.body.choices?.[0]?.message?.content;
    if (!raw) throw new Error("Empty AI response");

    raw = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(raw);

    const options = [...parsed.distractors, parsed.correct].sort(
      () => Math.random() - 0.5
    );

    return res.json({
      code: parsed.code,
      correct: parsed.correct,
      options
    });
  } catch (error) {
    console.error("Guess The Output AI Error:", error);
    return res.status(500).json({ error: "Failed to generate Guess The Output question" });
  }
}

export const regexRush = async (req, res) => {
  const prompt = `
You are generating a "Regex Rush" game question.

Rules:
- Generate ONE regex pattern
- Provide a mix of matching and non-matching strings
- "correct" must contain ONLY strings that match the regex
- Respond in PURE JSON ONLY (no markdown, no explanation)

JSON format:
{
  "pattern": "\\\\d{3}-\\\\d{2}-\\\\d{4}",
  "strings": ["123-45-6789", "abc-12-3456", "999-99-9999", "hello123"],
  "correct": ["123-45-6789", "999-99-9999"]
}
`;

  try {
    const response = await regexRushClient
      .path("/chat/completions")
      .post({
        body: {
          model,
          temperature: 1,
          top_p: 1,
          messages: [
            { role: "system", content: "You are an expert regex puzzle generator." },
            { role: "user", content: prompt }
          ]
        }
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    let raw = response.body.choices?.[0]?.message?.content;
    if (!raw) throw new Error("Empty AI response");

    raw = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(raw);

    return res.json(parsed);
  } catch (error) {
    console.error("Regex Rush AI Error:", error);
    return res.status(500).json({ error: "Failed to generate Regex Rush question" });
  }
};

export const typingSpeedTest = async (req, res) => {
  const { language = "javascript" } = req.body;

  const prompt = `
You are generating content for a Typing Speed Test game.

Rules:
- Generate a SHORT ${language} code snippet
- 5–8 lines MAX
- Beginner friendly
- ONLY code, no explanation, no markdown, no comments
`;

  try {
    const response = await typingSpeedClient
      .path("/chat/completions")
      .post({
        body: {
          model,
          temperature: 0.7,
          top_p: 1,
          messages: [
            {
              role: "system",
              content: "You generate clean beginner-friendly code snippets."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        }
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    let code = response.body.choices?.[0]?.message?.content;
    if (!code) throw new Error("Empty AI response");

    // Extra safety cleanup
    code = code
      .replace(/```[\s\S]*?```/g, "")
      .trim();

    return res.json({ code });
  } catch (error) {
    console.error("Typing Speed Test AI Error:", error);
    return res.status(500).json({
      error: "Failed to generate typing speed test code"
    });
  }
};

export const bugHunt = async (req, res) => {
  const prompt = `
You are generating content for a game called "Bug Hunt".

Rules:
- Use a common programming language (JavaScript preferred)
- Bug must be LOGICAL, not syntax error
- Code should be short and readable
- Respond in PURE JSON ONLY (no markdown, no explanation outside JSON)

JSON format:
{
  "language": "JavaScript",
  "buggyCode": "code with a logical bug",
  "explanation": "what the bug is",
  "fixedCode": "corrected code"
}
`;

  try {
    const response = await bugHuntClient
      .path("/chat/completions")
      .post({
        body: {
          model,
          temperature: 0.9,
          top_p: 1,
          messages: [
            {
              role: "system",
              content: "You are an expert software engineer creating bug-fixing challenges."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        }
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    let raw = response.body.choices?.[0]?.message?.content;
    if (!raw) throw new Error("Empty AI response");

    raw = raw.replace(/```json|```/g, "").trim();
    const data = JSON.parse(raw);

    return res.json(data);
  } catch (error) {
    console.error("Bug Hunt AI Error:", error);
    return res.status(500).json({
      error: "Failed to generate Bug Hunt challenge"
    });
  }
};

export const bugHuntValidate = async (req, res) => {
  const { buggyCode, userFix } = req.body;

  const prompt = `
You are an AI code reviewer.

Buggy code:
${buggyCode}

User's fix:
${userFix}

Rules:
- Check if the fix correctly resolves the LOGICAL bug
- Do NOT be overly strict about formatting
- Respond in PURE JSON ONLY

JSON format:
{
  "isCorrect": true/false,
  "feedback": "Short explanation"
}
`;

  try {
    const response = await bugHuntClient
      .path("/chat/completions")
      .post({
        body: {
          model,
          temperature: 0.3,
          top_p: 1,
          messages: [
            {
              role: "system",
              content: "You are a strict but fair code reviewer."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        }
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    let raw = response.body.choices?.[0]?.message?.content;
    if (!raw) throw new Error("Empty AI response");

    raw = raw.replace(/```json|```/g, "").trim();
    const result = JSON.parse(raw);

    return res.json(result);
  } catch (error) {
    console.error("Bug Hunt Validation AI Error:", error);
    return res.status(500).json({
      error: "Failed to validate bug fix"
    });
  }
};

export const BinaryClicker = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await binaryClickerClient
      .path("/chat/completions")
      .post({
        body: {
          model,
          temperature: 0.8,
          top_p: 1,
          messages: [
            {
              role: "system",
              content: "You generate concise, accurate responses for a binary logic game."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        }
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    let raw = response.body.choices?.[0]?.message?.content;
    if (!raw) throw new Error("Empty AI response");

    // Cleanup (if model adds formatting)
    raw = raw.replace(/```json|```/g, "").trim();

    // Try JSON parse, fallback to string
    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      result = raw;
    }

    return res.json({ result });
  } catch (error) {
    console.error("Binary Clicker AI Error:", error);
    return res.status(500).json({
      error: "Failed to generate Binary Clicker content"
    });
  }
};

export const shortcutNinja = async (req, res) => {
  const { topic = "IDE keyboard shortcuts" } = req.body;

  const prompt = `
You are generating a quiz for a game called "Shortcut Ninja".

Rules:
- Create ONE question about ${topic}
- Focus on commonly used IDE shortcuts
- Respond in PURE JSON ONLY (no markdown, no explanation)

JSON format:
{
  "question": "your question here",
  "answer": "correct shortcut here",
  "hint": "optional hint"
}
`;

  try {
    const response = await shortcutNinjaClient
      .path("/chat/completions")
      .post({
        body: {
          model,
          temperature: 0.7,
          top_p: 1,
          messages: [
            {
              role: "system",
              content: "You are an expert on IDE keyboard shortcuts."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        }
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    let raw = response.body.choices?.[0]?.message?.content;
    if (!raw) throw new Error("Empty AI response");

    raw = raw.replace(/```json|```/g, "").trim();
    const questionData = JSON.parse(raw);

    return res.json(questionData);
  } catch (error) {
    console.error("Shortcut Ninja AI Error:", error);
    return res.status(500).json({
      error: "Failed to generate shortcut question"
    });
  }
};

export const checkShortcutAnswer = async (req, res) => {
  const { question, userAnswer } = req.body;

  if (!question || !userAnswer) {
    return res.status(400).json({
      error: "Missing question or userAnswer"
    });
  }

  const prompt = `
You are validating an answer for a keyboard shortcut quiz.

Question:
"${question}"

User Answer:
"${userAnswer}"

Rules:
- Check if the shortcut is functionally correct
- Allow minor variations (Ctrl vs Cmd, spacing)
- Respond in PURE JSON ONLY

JSON format:
{
  "correct": true/false,
  "explanation": "short explanation or correct shortcut"
}
`;

  try {
    const response = await shortcutNinjaClient
      .path("/chat/completions")
      .post({
        body: {
          model,
          temperature: 0.3,
          top_p: 1,
          messages: [
            {
              role: "system",
              content: "You are a strict but fair shortcut evaluator."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        }
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    let raw = response.body.choices?.[0]?.message?.content;
    if (!raw) throw new Error("Empty AI response");

    raw = raw.replace(/```json|```/g, "").trim();
    const result = JSON.parse(raw);

    return res.json(result);
  } catch (error) {
    console.error("Shortcut Ninja Validation Error:", error);
    return res.status(500).json({
      error: "Failed to validate shortcut answer"
    });
  }
};

export const emojiPictionary = async (req, res) => {
  const prompt = `
You are generating Emoji Pictionary puzzles for programmers.

Rules:
- Generate 5–6 puzzles
- Each puzzle must represent a programming concept or term
- Use emojis creatively
- Respond in PURE JSON ONLY (no markdown, no explanation outside JSON)

JSON format:
[
  {
    "emoji": "🧠🔁",
    "term": "recursion",
    "hint": "A function that calls itself"
  }
]
`;

  try {
    const response = await emojiPictionaryClient
      .path("/chat/completions")
      .post({
        body: {
          model,
          temperature: 0.9,
          top_p: 1,
          messages: [
            {
              role: "system",
              content: "You create fun emoji-based programming puzzles."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        }
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    let raw = response.body.choices?.[0]?.message?.content;
    if (!raw) throw new Error("Empty AI response");

    raw = raw.replace(/```json|```/g, "").trim();
    const data = JSON.parse(raw);

    return res.json(data);
  } catch (e) {
    console.error("Emoji Pictionary AI Error:", e);
    return res.status(500).json({
      error: "AI failed to generate emoji puzzles"
    });
  }
};

export const emojiPictionaryAnswer = async (req, res) => {
  const { guess, correctTerm } = req.body;

  if (!guess || !correctTerm) {
    return res.status(400).json({ result: "Invalid input" });
  }

  const prompt = `
You are validating an Emoji Pictionary answer.

Correct term:
"${correctTerm}"

User guess:
"${guess}"

Rules:
- Check semantic correctness (synonyms are allowed)
- Be fair and beginner-friendly
- Respond in PURE JSON ONLY

JSON format:
{
  "isCorrect": true/false,
  "feedback": "short feedback message",
  "confidence": "high | medium | low"
}
`;

  try {
    const response = await emojiPictionaryClient
      .path("/chat/completions")
      .post({
        body: {
          model,
          temperature: 0.3,
          top_p: 1,
          messages: [
            {
              role: "system",
              content: "You are a fair evaluator of programming concepts."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        }
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    let raw = response.body.choices?.[0]?.message?.content;
    if (!raw) throw new Error("Empty AI response");

    raw = raw.replace(/```json|```/g, "").trim();
    const data = JSON.parse(raw);

    return res.json({
      result: data.isCorrect ? "✅ Correct!" : "❌ Incorrect",
      feedback: data.feedback,
      confidence: data.confidence,
      correct: data.isCorrect
    });
  } catch (e) {
    console.error("Emoji Pictionary Answer AI Error:", e);
    return res.status(500).json({
      error: "Failed to check answer with AI"
    });
  }
};

export const emojiPictionaryAiExplanation = async (req, res) => {
  const { term, context } = req.body;

  if (!term) {
    return res.status(400).json({ error: "Term is required" });
  }

  const prompt = `
Explain the programming or tech term "${term}" in simple terms.
${context ? `Context: ${context}` : ""}

Rules:
- 2–3 short sentences
- Beginner-friendly language
- Include a practical example if possible
- Respond with PLAIN TEXT ONLY
`;

  try {
    const response = await emojiPictionaryClient
      .path("/chat/completions")
      .post({
        body: {
          model,
          temperature: 0.5,
          top_p: 1,
          messages: [
            {
              role: "system",
              content: "You explain programming concepts simply and clearly."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        }
      });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    let explanation = response.body.choices?.[0]?.message?.content;
    if (!explanation) throw new Error("Empty AI response");

    explanation = explanation.replace(/```/g, "").trim();

    return res.json({
      term,
      explanation
    });
  } catch (e) {
    console.error("Emoji Pictionary Explanation AI Error:", e);
    return res.status(500).json({
      error: "AI failed to generate explanation"
    });
  }
};
