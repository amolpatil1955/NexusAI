import axios from "axios";

export const sendMessage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions", 
      {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data.choices[0].message);

  } catch (err) {
    // Actual error terminal mein dikhao
    console.error("STATUS :", err.response?.status);
    console.error("ERROR  :", err.response?.data || err.message);

    res.status(500).json({
      error: err.response?.data || err.message
    });
  }
};