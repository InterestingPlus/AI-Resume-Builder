import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Printer, FileText } from 'lucide-react';
import { useResume } from '../hooks/useResumes';
import { Button } from '../components/ui/Button';
import { Resume } from '../types/resume';

function ModernResume({ resume }: { resume: Resume }) {
  const { personal_info, summary, experience, education, skills, projects } = resume;
  return (
    <div className="bg-white font-sans text-gray-900 p-10 print:p-8">
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide">{personal_info.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
          {personal_info.email && <span>{personal_info.email}</span>}
          {personal_info.phone && <span>&bull; {personal_info.phone}</span>}
          {personal_info.location && <span>&bull; {personal_info.location}</span>}
          {personal_info.linkedin && <span>&bull; {personal_info.linkedin}</span>}
          {personal_info.website && <span>&bull; {personal_info.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1.5 mb-3">Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1.5 mb-3">Experience</h2>
          <div className="space-y-5">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900 text-base">{exp.job_title}</p>
                    <p className="text-blue-600 text-sm font-medium">{exp.company}{exp.location ? ` — ${exp.location}` : ''}</p>
                  </div>
                  <p className="text-gray-400 text-sm whitespace-nowrap ml-4">
                    {exp.start_date}{exp.end_date ? ` – ${exp.is_current ? 'Present' : exp.end_date}` : ''}
                  </p>
                </div>
                {exp.description.filter(Boolean).length > 0 && (
                  <ul className="mt-2 space-y-1 pl-4">
                    {exp.description.filter(Boolean).map((d, i) => (
                      <li key={i} className="text-sm text-gray-600 list-disc">{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1.5 mb-3">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{edu.degree}</p>
                    <p className="text-gray-500 text-sm">{edu.institution}</p>
                    {edu.gpa && <p className="text-gray-400 text-xs">GPA: {edu.gpa}</p>}
                  </div>
                  <p className="text-gray-400 text-sm whitespace-nowrap">
                    {edu.start_date}{edu.end_date ? ` – ${edu.end_date}` : ''}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1.5 mb-3">Projects</h2>
              {projects.map(proj => (
                <div key={proj.id} className="mb-3">
                  <p className="font-bold text-gray-900 text-sm">{proj.name}</p>
                  <p className="text-sm text-gray-600">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">{proj.technologies.join(' · ')}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-2">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1.5 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ClassicResume({ resume }: { resume: Resume }) {
  const { personal_info, summary, experience, education, skills, projects } = resume;
  return (
    <div className="bg-white font-sans text-gray-900 print:p-0">
      <div className="bg-gray-800 text-white px-10 py-8 print:px-8">
        <h1 className="text-3xl font-bold">{personal_info.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-300">
          {personal_info.email && <span>{personal_info.email}</span>}
          {personal_info.phone && <span>{personal_info.phone}</span>}
          {personal_info.location && <span>{personal_info.location}</span>}
          {personal_info.linkedin && <span>{personal_info.linkedin}</span>}
        </div>
      </div>
      <div className="p-10 print:p-8">
        {summary && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1.5 mb-3">Profile</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1.5 mb-3">Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between">
                  <span className="font-bold text-sm">{exp.job_title} — {exp.company}</span>
                  <span className="text-gray-400 text-sm">{exp.start_date}{exp.end_date ? ` – ${exp.is_current ? 'Present' : exp.end_date}` : ''}</span>
                </div>
                <ul className="mt-1 pl-4 space-y-1">
                  {exp.description.filter(Boolean).map((d, i) => (
                    <li key={i} className="text-sm text-gray-600 list-disc">{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1.5 mb-3">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between mb-2">
                <span className="font-bold text-sm">{edu.degree}, {edu.institution}</span>
                <span className="text-gray-400 text-sm">{edu.end_date}</span>
              </div>
            ))}
          </div>
        )}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1.5 mb-3">Skills</h2>
            <p className="text-sm text-gray-700">{skills.join(' · ')}</p>
          </div>
        )}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1.5 mb-3">Projects</h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-3">
                <p className="font-bold text-sm">{proj.name}</p>
                <p className="text-sm text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const { resume, loading } = useResume(id);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-center">
        <div>
          <p className="text-gray-500 mb-4">Resume not found.</p>
          <Link to="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: white; }
          .print-page { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={`/editor/${id}`} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Editor</span>
            </Link>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">{resume.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button size="sm" onClick={handlePrint}>
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="no-print min-h-screen bg-gray-200 pt-14 pb-10 px-4 flex justify-center">
        <div className="w-full max-w-3xl mt-8">
          <div ref={printRef} className="print-page shadow-2xl rounded-lg overflow-hidden">
            {resume.template === 'classic' ? (
              <ClassicResume resume={resume} />
            ) : (
              <ModernResume resume={resume} />
            )}
          </div>
        </div>
      </div>

      {/* Print-only content */}
      <div className="hidden print:block">
        <div ref={printRef}>
          {resume.template === 'classic' ? (
            <ClassicResume resume={resume} />
          ) : (
            <ModernResume resume={resume} />
          )}
        </div>
      </div>
    </>
  );
}
