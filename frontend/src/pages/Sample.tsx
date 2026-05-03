import React, { useState } from "react";
import { LayoutTemplate, CheckCircle, Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- TYPES & INTERFACES ---
interface Experience {
  role: string;
  company: string;
  date: string;
  bullets: string[];
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface ResumeData {
  name: string;
  contact: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

interface ThemeProps {
  data: ResumeData;
}

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  component: React.FC<ThemeProps>;
}

// --- DUMMY RESUME DATA ---
// Ye data sabhi themes mein use hoga taaki aap design ka difference dekh sakein
const resumeData: ResumeData = {
  name: "Alex Morgan",
  contact:
    "alex.morgan@example.com | +1 (555) 123-4567 | San Francisco, CA | alexmorgan.dev",
  summary:
    "An aspiring Web Developer with 2 years of experience, currently gaining hands-on experience as a Frontend Developer Intern. Proficient in MERN stack, REST API, and AI integration, with a foundational understanding of DSA and general software development principles.",
  experience: [
    {
      role: "Frontend Developer Intern",
      company: "TechNova Solutions",
      date: "March 2024 – Present",
      bullets: [
        "Developing and implementing user-facing features using modern web technologies and MERN stack components.",
        "Collaborating with development teams to integrate RESTful APIs, ensuring seamless data flow and application functionality.",
        "Assisting in the design and implementation of responsive web interfaces to enhance user experience.",
        "Exploring and applying AI integration techniques to enhance web application features and capabilities.",
      ],
    },
    {
      role: "Software Development Intern",
      company: "Innovate LLC",
      date: "May 2023 – June 2023",
      bullets: [
        "Contributed to the software development lifecycle, gaining practical experience in application development.",
        "Assisted in debugging and testing software components to ensure functionality and performance.",
        "Developed a foundational understanding of data structures and algorithms (DSA) through practical application.",
        "Collaborated with team members on various development tasks, fostering teamwork and communication skills.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Science (BCS)",
      school: "State University College of Engineering",
      year: "2025",
    },
  ],
  skills: [
    "AI Integration",
    "DSA",
    "JWT",
    "MERN",
    "REST API",
    "React",
    "Node.js",
  ],
};

// --- THEME 1: MINIMALIST (Based on your 1st Screenshot) ---
const MinimalistTheme: React.FC<ThemeProps> = ({ data }) => (
  <div className="bg-white w-full max-w-[800px] min-h-full md:min-h-[1050px] mx-auto p-6 md:p-12 text-gray-800 font-sans shadow-lg md:shadow-2xl">
    <div className="border-b border-gray-400 pb-4 mb-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {data.name}
      </h1>
      <p className="text-xs md:text-sm text-gray-600">{data.contact}</p>
    </div>

    <div className="mb-6">
      <h2 className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
        Summary
      </h2>
      <p className="text-sm text-gray-800 leading-relaxed">{data.summary}</p>
    </div>

    <div className="mb-6">
      <h2 className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
        Experience
      </h2>
      <div className="space-y-5">
        {data.experience.map((exp, i) => (
          <div key={i}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
              <h3 className="text-base font-bold text-gray-900">{exp.role}</h3>
              <span className="text-xs sm:text-sm text-gray-400 font-medium mt-1 sm:mt-0">
                {exp.date}
              </span>
            </div>
            <div className="text-sm font-semibold text-blue-600 mb-2">
              {exp.company}
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1.5">
              {exp.bullets.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-8 border-t border-gray-200 pt-6">
      <div>
        <h2 className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
          Education
        </h2>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-2 text-sm">
            <div className="flex flex-col md:flex-row md:justify-between font-bold text-gray-900">
              <span>{edu.degree}</span>
              <span className="text-gray-400 font-medium">− {edu.year}</span>
            </div>
            <div className="text-gray-600">{edu.school}</div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <span
              key={i}
              className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-xs font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- THEME 2: CLASSIC DARK HEADER (Based on your 2nd Screenshot) ---
const ClassicTheme: React.FC<ThemeProps> = ({ data }) => (
  <div className="bg-white w-full max-w-[800px] min-h-full md:min-h-[1050px] mx-auto text-gray-800 font-sans shadow-lg md:shadow-2xl overflow-hidden">
    {/* Dark Header Block */}
    <div className="bg-slate-800 text-white p-6 md:p-12 md:pb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3">
        {data.name}
      </h1>
      <p className="text-xs md:text-sm text-slate-300 opacity-90 leading-relaxed">
        {data.contact}
      </p>
    </div>

    <div className="p-6 md:p-12 md:pt-8">
      <div className="mb-8">
        <h2 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-2 mb-3">
          Profile
        </h2>
        <p className="text-sm text-gray-800 leading-relaxed">{data.summary}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">
          Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <div className="text-base font-bold text-gray-900 mb-1 sm:mb-0">
                  {exp.role}{" "}
                  <span className="hidden sm:inline text-gray-400 font-normal mx-1">
                    —
                  </span>{" "}
                  <span className="block sm:inline text-gray-700">
                    {exp.company}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-400">
                  {exp.date}
                </span>
              </div>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1.5">
                {exp.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">
          Education
        </h2>
        {data.education.map((edu, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:justify-between text-sm font-bold text-gray-900"
          >
            <span>
              {edu.degree}, {edu.school}
            </span>
            <span className="text-gray-400 font-normal mt-1 sm:mt-0">
              {edu.year}
            </span>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">
          Skills
        </h2>
        <p className="text-sm text-gray-800 leading-relaxed">
          {data.skills.join(" • ")}
        </p>
      </div>
    </div>
  </div>
);

// --- THEME 3: MODERN TWO-COLUMN (Bonus Theme) ---
const ModernTheme: React.FC<ThemeProps> = ({ data }) => (
  <div className="bg-white w-full max-w-[800px] min-h-full md:min-h-[1050px] mx-auto text-gray-800 font-sans shadow-lg md:shadow-2xl flex flex-col sm:flex-row">
    {/* Left Sidebar */}
    <div className="w-full sm:w-1/3 bg-blue-50 p-6 md:p-8 border-b sm:border-b-0 sm:border-r border-blue-100 flex flex-col gap-6 md:gap-8">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-600 rounded-full text-white flex items-center justify-center text-2xl md:text-3xl font-bold mb-2 shadow-lg">
        {data.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>

      <div>
        <h2 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-3 border-b border-blue-200 pb-1">
          Contact
        </h2>
        <div className="text-sm text-gray-700 space-y-2 break-words">
          {data.contact.split(" | ").map((line, i) => (
            <p key={i} className="font-medium">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-3 border-b border-blue-200 pb-1">
          Skills
        </h2>
        <div className="flex flex-row flex-wrap sm:flex-col gap-2 text-sm font-medium text-gray-700">
          {data.skills.map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-blue-100/50 sm:bg-transparent px-2 py-1 sm:px-0 sm:py-0 rounded"
            >
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-3 border-b border-blue-200 pb-1">
          Education
        </h2>
        {data.education.map((edu, i) => (
          <div key={i} className="text-sm mb-3">
            <p className="font-bold text-gray-900">{edu.year}</p>
            <p className="font-semibold text-blue-700">{edu.degree}</p>
            <p className="text-gray-600 text-xs mt-1">{edu.school}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Right Main Content */}
    <div className="w-full sm:w-2/3 p-6 md:p-10 pt-8 md:pt-12">
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight">
        {data.name}
      </h1>

      <div className="mb-8 md:mb-10">
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </div>

      <div>
        <h2 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-widest border-b-2 border-gray-900 pb-2 mb-6">
          Experience
        </h2>
        <div className="space-y-8">
          {data.experience.map((exp, i) => (
            <div key={i} className="relative pl-4 border-l-2 border-blue-200">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 border-4 border-white"></div>
              <div className="mb-2">
                <h3 className="text-base md:text-lg font-bold text-gray-900">
                  {exp.role}
                </h3>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm mt-1 sm:mt-0">
                  <span className="font-semibold text-blue-600 mb-1 sm:mb-0">
                    {exp.company}
                  </span>
                  <span className="text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded self-start sm:self-auto">
                    {exp.date}
                  </span>
                </div>
              </div>
              <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1.5 mt-2">
                {exp.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP (SAMPLES GALLERY PAGE ONLY) ---
export default function SamplePage() {
  const [activeTheme, setActiveTheme] = useState<string>("minimalist");

  // Mocking useNavigate for standalone preview if router is missing
  const navigate = useNavigate();

  const themes: ThemeOption[] = [
    {
      id: "minimalist",
      name: "Minimalist Theme",
      description: "Clean, modern, and highly readable.",
      component: MinimalistTheme,
    },
    {
      id: "classic",
      name: "Classic Dark",
      description: "Professional with a striking dark header.",
      component: ClassicTheme,
    },
    {
      id: "modern",
      name: "Modern Split",
      description: "Two-column layout for visual impact.",
      component: ModernTheme,
    },
  ];

  const ActiveComponent =
    themes.find((t) => t.id === activeTheme)?.component || MinimalistTheme;

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5 md:w-5 md:h-5" />
          </button>
          <div>
            <h1 className="text-base md:text-xl font-bold text-gray-900 flex items-center gap-1.5 md:gap-2">
              <LayoutTemplate className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              Template Gallery
            </h1>
            <p className="hidden md:block text-sm text-gray-500">
              Preview how your resume looks in different styles.
            </p>
          </div>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 md:px-5 md:py-2 rounded-lg font-medium text-xs md:text-sm flex items-center gap-1.5 md:gap-2 shadow-sm transition-colors"
          onClick={() => navigate("/login")}
        >
          <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Use This Template</span>
          <span className="sm:hidden">Use</span>
        </button>
      </header>

      {/* Main Layout: Changes from flex-row to flex-col on mobile */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Sidebar - Theme Selector */}
        <div className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-gray-200 overflow-x-auto md:overflow-y-auto p-4 md:p-6 flex-shrink-0 z-10 shadow-sm md:shadow-none">
          <h2 className="hidden md:block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Available Themes
          </h2>
          {/* List flex-row on mobile, flex-col on desktop */}
          <div className="flex md:flex-col gap-4 pb-2 md:pb-0">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`cursor-pointer rounded-xl border-2 transition-all p-3 md:p-4 min-w-[240px] md:min-w-0 ${
                  activeTheme === theme.id
                    ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start mb-1 md:mb-2">
                  <h3
                    className={`font-bold text-sm md:text-base ${activeTheme === theme.id ? "text-blue-900" : "text-gray-900"}`}
                  >
                    {theme.name}
                  </h3>
                  {activeTheme === theme.id && (
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  )}
                </div>
                <p className="text-xs md:text-sm text-gray-500 line-clamp-1 md:line-clamp-none">
                  {theme.description}
                </p>

                {/* Mini Visual Indicator (Hidden on small mobile screens to save space, visible on tablet+) */}
                <div className="hidden sm:block mt-4 h-20 md:h-24 bg-white border border-gray-200 rounded overflow-hidden p-2 pointer-events-none opacity-80">
                  {theme.id === "minimalist" && (
                    <div className="w-full h-full flex flex-col gap-1">
                      <div className="w-1/2 h-2 bg-gray-800 rounded"></div>
                      <div className="w-full h-px bg-gray-300 my-1"></div>
                      <div className="w-full h-1 bg-gray-200 rounded"></div>
                      <div className="w-3/4 h-1 bg-gray-200 rounded"></div>
                    </div>
                  )}
                  {theme.id === "classic" && (
                    <div className="w-full h-full flex flex-col">
                      <div className="w-full h-6 bg-slate-800 rounded-sm mb-2"></div>
                      <div className="w-1/3 h-1 bg-gray-800 rounded mb-1"></div>
                      <div className="w-full h-1 bg-gray-200 rounded"></div>
                    </div>
                  )}
                  {theme.id === "modern" && (
                    <div className="w-full h-full flex gap-2">
                      <div className="w-1/3 h-full bg-blue-100 rounded-sm"></div>
                      <div className="w-2/3 h-full flex flex-col gap-1 py-1">
                        <div className="w-full h-2 bg-gray-800 rounded"></div>
                        <div className="w-full h-1 bg-gray-200 rounded mt-2"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Display Area - Live Resume Preview */}
        <div className="flex-1 overflow-y-auto bg-slate-200 p-4 sm:p-6 md:p-8 flex justify-center items-start">
          {/* Wrapper to simulate actual A4 Paper zoom/shadow */}
          <div className="w-full transform origin-top transition-all duration-300 md:hover:scale-[1.01]">
            <ActiveComponent data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
