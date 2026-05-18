import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",

  apiKey: process.env.OPENROUTER_API_KEY,

  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Nutrition Demo App",
  },
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion =
      await client.chat.completions.create({
        model:
          "openrouter/owl-alpha",

        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });

    return Response.json({
      reply:
        completion.choices[0].message.content,
    });

  } catch (error) {
    console.log(error);

    return Response.json({
      error:
        error?.message ||
        "Something went wrong",
    });
  }
}