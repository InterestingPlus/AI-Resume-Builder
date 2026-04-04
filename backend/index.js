require("dotenv").config();
const express = require("express");
const cors = require("cors");
const job = require("./cron.js");

const app = express();
job.start();

app.use(cors());
app.use(express.json());

const PORT = 5000;
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Missing GEMINI_API_KEY");
  process.exit(1);
}

app.post("/parse-resume", async (req, res) => {
  try {
    const { rawInput } = req.body;

    if (!rawInput || typeof rawInput !== "string") {
      return res.status(400).json({
        error: "rawInput is required",
      });
    }

    const prompt = `You are a professional resume parser and writer. Parse the following paragraph and extract structured resume data. Return ONLY valid JSON with no markdown, no code blocks, just raw JSON.

Input paragraph:
"${rawInput}"

Return this exact JSON structure:
{
  "personal_info": {
    "name": "Full Name",
    "email": "email@example.com",
    "phone": "phone number or empty string",
    "location": "city, state or country or empty string",
    "linkedin": "linkedin url or empty string",
    "website": "website url or empty string"
  },
  "summary": "A professional 2-3 sentence summary highlighting their role, experience, and key strengths. Make it impactful and ATS-friendly.",
  "experience": [
    {
      "id": "exp_1",
      "job_title": "Job Title",
      "company": "Company Name",
      "start_date": "Month Year or Year",
      "end_date": "Month Year or Year or Present",
      "is_current": false,
      "location": "Location or Remote or empty string",
      "description": ["bullet point 1", "bullet point 2", "bullet point 3"]
    }
  ],
  "education": [
    {
      "id": "edu_1",
      "degree": "Degree Name",
      "institution": "University/School Name",
      "start_date": "Year or empty string",
      "end_date": "Year",
      "gpa": "GPA if mentioned or empty string"
    }
  ],
  "skills": ["skill1", "skill2", "skill3"],
  "projects": [
    {
      "id": "proj_1",
      "name": "Project Name",
      "description": "Brief description",
      "technologies": ["tech1", "tech2"]
    }
  ]
}

Rules:
- Extract all information accurately from the input
- For experience descriptions, write professional action-oriented bullet points
- Sort skills alphabetically
- If information is missing, use empty string or empty array
- Generate 2-4 bullet points per experience entry
- Make descriptions quantifiable where possible
- Return ONLY the JSON object, no other text`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048,
          },
        }),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: err });
    }

    const data = await response.json();

    let text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";

    if (!text) {
      return res.status(500).json({
        error: "No response from Gemini",
      });
    }

    // Clean AI nonsense
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.log("⚠️ JSON parse failed, attempting repair...");

      try {
        // Try to fix incomplete JSON
        let fixed = text;

        // Balance brackets
        const openBraces = (fixed.match(/{/g) || []).length;
        const closeBraces = (fixed.match(/}/g) || []).length;

        const openBrackets = (fixed.match(/\[/g) || []).length;
        const closeBrackets = (fixed.match(/]/g) || []).length;

        fixed += "}".repeat(openBraces - closeBraces);
        fixed += "]".repeat(openBrackets - closeBrackets);

        parsed = JSON.parse(fixed);
      } catch (repairError) {
        return res.status(500).json({
          error: "Invalid JSON from AI",
          raw: text,
        });
      }
    }

    return res.json({ data: parsed });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Unknown error",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
