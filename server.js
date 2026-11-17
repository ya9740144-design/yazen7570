const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Roblox AI is running!");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "اكتب رسالة أولاً" });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions: "أنت مساعد ذكي داخل لعبة كرة قدم في Roblox. أجب بالعربية، وساعد في البرمجة وكتابة سكربتات Roblox Lua.",
      input: message
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ في الذكاء الاصطناعي" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("AI server running on " + PORT));
