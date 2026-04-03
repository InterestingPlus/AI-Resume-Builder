import { Resume } from '../../types/resume';

interface Props {
  resume: Resume;
}

export function ResumePreviewPanel({ resume }: Props) {
  const { personal_info, summary, experience, education, skills, projects, template } = resume;

  if (template === 'classic') {
    return <ClassicTemplate resume={resume} />;
  }

  return (
    <div className="bg-white shadow-sm text-gray-900 text-[10px] leading-[1.4] font-sans p-6 min-h-full">
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-3 mb-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-wide uppercase">{personal_info.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-3 mt-1 text-gray-500 text-[9px]">
          {personal_info.email && <span>{personal_info.email}</span>}
          {personal_info.phone && <span>&bull; {personal_info.phone}</span>}
          {personal_info.location && <span>&bull; {personal_info.location}</span>}
          {personal_info.linkedin && <span>&bull; {personal_info.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">Experience</h2>
          <div className="space-y-3">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">{exp.job_title}</p>
                    <p className="text-blue-600 text-[9px]">{exp.company}{exp.location ? ` — ${exp.location}` : ''}</p>
                  </div>
                  <p className="text-gray-400 text-[9px] whitespace-nowrap ml-2">
                    {exp.start_date}{exp.end_date ? ` – ${exp.is_current ? 'Present' : exp.end_date}` : ''}
                  </p>
                </div>
                {exp.description.length > 0 && (
                  <ul className="mt-1 space-y-0.5 pl-3">
                    {exp.description.map((d, i) => (
                      <li key={i} className="text-gray-600 relative before:content-['•'] before:absolute before:-left-2.5 before:text-gray-400">{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          {/* Education */}
          {education.length > 0 && (
            <div className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-gray-500">{edu.institution}</p>
                  </div>
                  <p className="text-gray-400 text-[9px] whitespace-nowrap">
                    {edu.start_date}{edu.end_date ? ` – ${edu.end_date}` : ''}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">Projects</h2>
              {projects.map(proj => (
                <div key={proj.id} className="mb-2">
                  <p className="font-bold text-gray-900">{proj.name}</p>
                  <p className="text-gray-600">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <p className="text-gray-400 text-[9px]">{proj.technologies.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-2">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[9px]">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ClassicTemplate({ resume }: Props) {
  const { personal_info, summary, experience, education, skills, projects } = resume;
  return (
    <div className="bg-white text-gray-900 text-[10px] leading-[1.4] font-sans">
      <div className="bg-gray-800 text-white px-6 py-5">
        <h1 className="text-xl font-bold tracking-wide">{personal_info.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-3 mt-1 text-gray-300 text-[9px]">
          {personal_info.email && <span>{personal_info.email}</span>}
          {personal_info.phone && <span>{personal_info.phone}</span>}
          {personal_info.location && <span>{personal_info.location}</span>}
        </div>
      </div>
      <div className="p-6">
        {summary && (
          <div className="mb-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1 mb-2">Profile</h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1 mb-2">Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-bold">{exp.job_title} — {exp.company}</span>
                  <span className="text-gray-400 text-[9px]">{exp.start_date}{exp.end_date ? ` – ${exp.is_current ? 'Present' : exp.end_date}` : ''}</span>
                </div>
                <ul className="mt-1 pl-3 space-y-0.5">
                  {exp.description.map((d, i) => (
                    <li key={i} className="text-gray-600 relative before:content-['•'] before:absolute before:-left-2.5 before:text-gray-400">{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1 mb-2">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between mb-1">
                <span className="font-bold">{edu.degree}, {edu.institution}</span>
                <span className="text-gray-400 text-[9px]">{edu.end_date}</span>
              </div>
            ))}
          </div>
        )}
        {skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1 mb-2">Skills</h2>
            <p className="text-gray-700">{skills.join(' • ')}</p>
          </div>
        )}
        {projects.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1 mb-2">Projects</h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-2">
                <p className="font-bold">{proj.name}</p>
                <p className="text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
