import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  FileText, User, Briefcase, GraduationCap, Wrench, FolderOpen, AlignLeft,
  Eye, Download, Save, CheckCircle, ChevronRight, ZoomIn, ZoomOut
} from 'lucide-react';
import { useResume } from '../hooks/useResumes';
import { Resume } from '../types/resume';
import { Button } from '../components/ui/Button';
import { ResumePreviewPanel } from '../components/editor/ResumePreviewPanel';
import { PersonalInfoSection } from '../components/editor/sections/PersonalInfoSection';
import { ExperienceSection } from '../components/editor/sections/ExperienceSection';
import { EducationSection } from '../components/editor/sections/EducationSection';
import { SkillsSection } from '../components/editor/sections/SkillsSection';
import { SummarySection } from '../components/editor/sections/SummarySection';
import { ProjectsSection } from '../components/editor/sections/ProjectsSection';

type Section = 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'summary';

const sections: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'skills', label: 'Skills', icon: <Wrench className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
  { id: 'summary', label: 'Summary', icon: <AlignLeft className="w-4 h-4" /> },
];

function computeScore(resume: Resume): number {
  let score = 0;
  const p = resume.personal_info;
  if (p.name) score += 10;
  if (p.email) score += 10;
  if (p.phone) score += 5;
  if (p.location) score += 5;
  if (resume.summary && resume.summary.length > 50) score += 15;
  if (resume.experience.length > 0) score += 20;
  if (resume.education.length > 0) score += 10;
  if (resume.skills.length >= 5) score += 10;
  if (resume.skills.length >= 10) score += 5;
  if (resume.projects.length > 0) score += 5;
  if (p.linkedin) score += 5;
  return Math.min(score, 100);
}

export function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const { resume, loading, updateResume } = useResume(id);
  const [localResume, setLocalResume] = useState<Resume | null>(null);
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [previewZoom, setPreviewZoom] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    if (resume && !localResume) {
      setLocalResume(resume);
    }
  }, [resume]);

  const handleChange = useCallback((updates: Partial<Resume>) => {
    setLocalResume(prev => prev ? { ...prev, ...updates } : prev);
    setSaveStatus('unsaved');
  }, []);

  const handleSave = useCallback(async () => {
    if (!localResume) return;
    setSaveStatus('saving');
    await updateResume({
      personal_info: localResume.personal_info,
      summary: localResume.summary,
      experience: localResume.experience,
      education: localResume.education,
      skills: localResume.skills,
      projects: localResume.projects,
      template: localResume.template,
    });
    setSaveStatus('saved');
  }, [localResume, updateResume]);

  useEffect(() => {
    if (saveStatus !== 'unsaved') return;
    const timer = setTimeout(handleSave, 2000);
    return () => clearTimeout(timer);
  }, [saveStatus, handleSave]);

  if (loading || !localResume) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading resume...</p>
        </div>
      </div>
    );
  }

  const score = computeScore(localResume);

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoSection
            data={localResume.personal_info}
            onChange={v => handleChange({ personal_info: v })}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            data={localResume.experience}
            onChange={v => handleChange({ experience: v })}
          />
        );
      case 'education':
        return (
          <EducationSection
            data={localResume.education}
            onChange={v => handleChange({ education: v })}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            data={localResume.skills}
            onChange={v => handleChange({ skills: v })}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            data={localResume.projects}
            onChange={v => handleChange({ projects: v })}
          />
        );
      case 'summary':
        return (
          <SummarySection
            data={localResume.summary}
            onChange={v => handleChange({ summary: v })}
          />
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 flex-shrink-0 z-40">
        <div className="px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 hidden sm:block">ResumateAI</span>
            </Link>
            <span className="text-gray-300 hidden sm:block">|</span>
            <span className="text-sm font-medium text-gray-600 hidden sm:block truncate max-w-[200px]">{localResume.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              {saveStatus === 'saved' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="hidden sm:block">Saved</span>
                </>
              ) : saveStatus === 'saving' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="hidden sm:block">Saving...</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="hidden sm:block">Unsaved</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-1 ml-2">
              <Button variant="outline" size="sm" onClick={handleSave} loading={saveStatus === 'saving'}>
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:block">Save</span>
              </Button>
              <Link to={`/preview/${id}`}>
                <Button variant="outline" size="sm">
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">Preview</span>
                </Button>
              </Link>
              <Link to={`/preview/${id}`}>
                <Button size="sm">
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">Download PDF</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-52 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 overflow-y-auto hidden md:flex">
          <div className="p-4 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Resume Sections</p>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {section.icon}
                {section.label}
                {section.id === 'personal' && localResume.personal_info.name && (
                  <CheckCircle className={`w-3.5 h-3.5 ml-auto ${activeSection === section.id ? 'text-blue-200' : 'text-green-500'}`} />
                )}
              </button>
            ))}
          </nav>

          {/* Resume Score */}
          <div className="p-4 border-t border-gray-100">
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-xs font-bold text-blue-700">Resume Score</span>
              </div>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-2xl font-extrabold text-gray-900">{score}</span>
                <span className="text-sm text-gray-400 mb-0.5">/ 100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {score < 60 ? 'Add more details to improve.' : score < 80 ? 'Looking good! Add skills to improve.' : 'Great resume!'}
              </p>
            </div>
          </div>
        </aside>

        {/* Main Editor */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Mobile section nav */}
          <div className="md:hidden mb-4 flex gap-2 overflow-x-auto pb-2">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeSection === s.id ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>

          {/* Section nav breadcrumb */}
          <div className="hidden md:flex items-center gap-1 text-xs text-gray-400 mb-6">
            <span>Resume</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-medium capitalize">{activeSection}</span>
          </div>

          <div className="max-w-2xl">
            {renderSection()}
          </div>
        </main>

        {/* Right: Live Preview */}
        <aside className="w-80 xl:w-96 bg-gray-100 border-l border-gray-200 flex flex-col flex-shrink-0 hidden lg:flex">
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 flex-shrink-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Live Preview</p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPreviewZoom(z => Math.max(z - 10, 50))}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-gray-400 w-8 text-center">{previewZoom}%</span>
              <button
                onClick={() => setPreviewZoom(z => Math.min(z + 10, 150))}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden origin-top-left"
              style={{ transform: `scale(${previewZoom / 100})`, transformOrigin: 'top center', width: `${10000 / previewZoom}%` }}
            >
              <ResumePreviewPanel resume={localResume} />
            </div>
          </div>

          {/* Template Switcher */}
          <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Template</p>
            <div className="grid grid-cols-2 gap-2">
              {(['modern', 'classic'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => handleChange({ template: t })}
                  className={`flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all ${
                    localResume.template === t
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className={`w-full h-14 rounded-lg overflow-hidden ${t === 'modern' ? 'bg-white' : 'bg-gray-800'} border border-gray-200 flex flex-col gap-1 p-1.5`}>
                    <div className={`h-2 w-3/4 rounded ${t === 'modern' ? 'bg-gray-800' : 'bg-white'}`} />
                    <div className={`h-1.5 w-1/2 rounded ${t === 'modern' ? 'bg-blue-300' : 'bg-gray-400'}`} />
                    <div className="mt-1 space-y-0.5">
                      <div className={`h-1 w-full rounded ${t === 'modern' ? 'bg-gray-200' : 'bg-gray-600'}`} />
                      <div className={`h-1 w-4/5 rounded ${t === 'modern' ? 'bg-gray-200' : 'bg-gray-600'}`} />
                    </div>
                  </div>
                  <span className={`text-xs font-medium capitalize ${localResume.template === t ? 'text-blue-600' : 'text-gray-500'}`}>
                    {t}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
