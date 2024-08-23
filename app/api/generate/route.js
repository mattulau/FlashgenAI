import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only Generate 10 Flashcards

Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format
{
  "flashcards": [
    {
      "front": str,
      "back": str
    }
  ]
}
`

// const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  const data = await req.text()

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: data,
      }
    ],
    model: "llama-3.1-70b-versatile",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
    response_format: {type: 'json_object'}
  });

  const flashcards = JSON.parse(chatCompletion.choices[0].message.content);

  return NextResponse.json(flashcards.flashcards);
  
  // for await (const chunk of chatCompletion) {
  //   process.stdout.write(chunk.choices[0]?.delta?.content || '');
  // }
}