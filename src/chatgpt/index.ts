import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

export async function getGPTResponse(userMessage: string): Promise<string> {
  try {
    const openai = new OpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });
    console.log(completion.choices[0].message);

    return (completion.choices[0].message as unknown as string).trim();
  } catch (error) {
    console.error('Error:', error);
    return 'Sorry, I couldn’t process your request at the moment.';
  }
}