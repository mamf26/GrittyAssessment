// backend part of the application
import OpenAI from "openai"; 
import type { NextApiRequest, NextApiResponse } from "next";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
  });
  
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (!req.body.text) {
        return res.status(400).json({ error: "Missing 'text' in request body" });
      }
  
      // Make a chat completion request
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",  // Change this to "gpt-4" if you want GPT-4
        messages: [{ role: "user", content: req.body.text }],
        temperature: 0.7,
        max_tokens: 256,
      });
  
      // Ensure the completion response contains choices
      if (!completion.choices || completion.choices.length === 0) {
        return res.status(500).json({ error: "No response from OpenAI" });
      }
  
      // Send back the message content from the first choice
      res.status(200).json({ result: completion.choices[0].message.content });
    } catch (error: any) {
      console.error("OpenAI API Error:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  }



// original - this comes from the playground...the above code is modified to fit the means of my program.
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const response = await openai.responses.create({
//   model: "gpt-4o-mini",
//   input: [],
//   text: {
//     "format": {
//       "type": "text"
//     }
//   },
//   reasoning: {},
//   tools: [],
//   temperature: 1,
//   max_output_tokens: 2048,
//   top_p: 1,
//   store: true
// });