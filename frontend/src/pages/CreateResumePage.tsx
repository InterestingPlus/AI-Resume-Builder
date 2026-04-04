import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  FileText,
  Info,
  ChevronRight,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";

const EXAMPLE_PLACEHOLDER = `My name is Alex Morgan. I am a Senior Product Designer with 5 years of experience.

Experience:
- TechFlow Solutions, Senior Product Designer, Jan 2020 - Present (Remote). Led redesign of core SaaS platform, increased user retention by 45%. Managed team of 5 designers, conducted weekly critiques.
- Creative Pulse Agency, UI/UX Designer, 2017 - 2020. Delivered high-fidelity prototypes for Fortune 500 clients. Collaborated with frontend developers.

Education: Bachelor of Fine Arts, Design, Rhode Island School of Design, 2013 - 2017.

Skills: Figma, Adobe XD, Prototyping, User Research, HTML/CSS, Design Systems, Wireframing.

Projects: Resume Builder App - Built an AI-powered resume generator using React and Node.js.

Achievements: Best UI Design 2021, Awwwards Ribbon.`;

export function CreateResumePage() {
  const [title, setTitle] = useState("");
  const [rawInput, setRawInput] = useState("");
  const [step, setStep] = useState<"input" | "generating">("input");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!title.trim()) {
      setError("Please enter a resume title.");
      return;
    }
    if (rawInput.trim().length < 50) {
      setError("Please provide more details (at least 50 characters).");
      return;
    }

    setError("");
    setStep("generating");

    try {
      // const supabaseUrl = "https://avvrfvdtrkzcaihcppks.supabase.co";
      // const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

      // const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setError("Session expired. Please log in again.");
        setStep("input");
        return;
      }

      // const response = await fetch(`http://localhost:5000/parse-resume`, {
      //   method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${session.access_token}`,
      //   Apikey: supabaseAnonKey,
      // },
      //   body:  JSON.stringify({ rawInput }),
      // });

      console.log(rawInput);
      const response = await fetch(
        "https://ai-resume-builder-16vp.onrender.com/parse-resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rawInput }),
        },
      );

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || "AI generation failed");
      }

      const aiData = result.data;

      const { data: resume, error: dbError } = await supabase
        .from("resumes")
        .insert({
          user_id: user!.id,
          title: title.trim(),
          raw_input: rawInput,
          personal_info: aiData.personal_info || {
            name: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            website: "",
          },
          summary: aiData.summary || "",
          experience: aiData.experience || [],
          education: aiData.education || [],
          skills: aiData.skills || [],
          projects: aiData.projects || [],
          template: "modern",
          ai_generated: true,
        })
        .select()
        .maybeSingle();

      if (dbError) throw new Error(dbError.message);

      navigate(`/editor/${resume!.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStep("input");
    }
  };

  const handleSkipAI = async () => {
    if (!title.trim()) {
      setError("Please enter a resume title.");
      return;
    }
    setError("");

    const { data: resume, error: dbError } = await supabase
      .from("resumes")
      .insert({
        user_id: user!.id,
        title: title.trim(),
        raw_input: rawInput,
        personal_info: {
          name: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          website: "",
        },
        summary: "",
        experience: [],
        education: [],
        skills: [],
        projects: [],
        template: "modern",
        ai_generated: false,
      })
      .select()
      .maybeSingle();

    if (dbError) {
      setError(dbError.message);
      return;
    }
    navigate(`/editor/${resume!.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-gray-900">ResumateAI</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="flex items-center gap-1 font-medium text-blue-600">
              <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </span>
              Input
            </span>
            <ChevronRight className="w-3 h-3" />
            <span>Edit</span>
            <ChevronRight className="w-3 h-3" />
            <span>Preview</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {step === "generating" ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 relative">
              <Sparkles className="w-10 h-10 text-blue-500 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              AI is building your resume...
            </h2>
            <p className="text-gray-500 max-w-sm">
              Analyzing your experience, generating professional summaries, and
              structuring your content. This takes about 10-15 seconds.
            </p>
            <div className="mt-8 flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create New Resume
              </h1>
              <p className="text-gray-500">
                Let AI transform your rough notes into a polished, professional
                resume.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )}

            {/* Step 1: Resume Title */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Resume Title
                <span className="text-red-400 ml-1">*</span>
              </label>
              <p className="text-xs text-gray-400 mb-3">
                Give your resume a name (e.g., "Software Engineer - Google
                2024")
              </p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Senior Product Designer Resume"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
              />
            </div>

            {/* Step 2: Raw Input */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <div className="flex items-start justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Your Details
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <span className="text-xs text-gray-400">
                  {rawInput.length} characters
                </span>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-800 mb-1">
                      Write all your details in one paragraph including:
                    </p>
                    <ul className="text-xs text-amber-700 space-y-0.5 list-disc list-inside">
                      <li>
                        Name &amp; Role / Title (e.g., Full Stack Developer)
                      </li>
                      <li>
                        Experience: company name, position, time (year),
                        description
                      </li>
                      <li>Education: degree, institution, year</li>
                      <li>Skills (comma-separated)</li>
                      <li>
                        Projects (if any): name, description, technologies
                      </li>
                      <li>Achievements or Certifications</li>
                    </ul>
                  </div>
                </div>
              </div>

              <textarea
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder={EXAMPLE_PLACEHOLDER}
                rows={12}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={handleGenerate}
                className="flex-1 text-base py-3.5 shadow-lg shadow-blue-100"
              >
                <Sparkles className="w-5 h-5" />
                Generate with AI
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSkipAI}
                className="sm:w-auto text-sm"
              >
                Skip AI &mdash; Fill Manually
              </Button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">
              AI uses Google Gemini to analyze your input and generate
              structured resume content.
            </p>
          </>
        )}
      </main>
    </div>
  );
}
