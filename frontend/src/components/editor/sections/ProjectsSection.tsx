import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';
import { ProjectItem } from '../../../types/resume';

interface Props {
  data: ProjectItem[];
  onChange: (data: ProjectItem[]) => void;
}

function generateId() {
  return `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

const emptyProject = (): ProjectItem => ({
  id: generateId(),
  name: '',
  description: '',
  technologies: [],
});

export function ProjectsSection({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(data[0]?.id || null);
  const [techInput, setTechInput] = useState<Record<string, string>>({});

  const update = (id: string, field: keyof ProjectItem, value: unknown) => {
    onChange(data.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addProject = () => {
    const newProj = emptyProject();
    onChange([...data, newProj]);
    setExpanded(newProj.id);
  };

  const removeProject = (id: string) => {
    onChange(data.filter(p => p.id !== id));
    if (expanded === id) setExpanded(null);
  };

  const addTech = (id: string) => {
    const val = techInput[id]?.trim();
    if (!val) return;
    const proj = data.find(p => p.id === id)!;
    if (!proj.technologies.includes(val)) {
      update(id, 'technologies', [...proj.technologies, val]);
    }
    setTechInput(prev => ({ ...prev, [id]: '' }));
  };

  const removeTech = (id: string, tech: string) => {
    const proj = data.find(p => p.id === id)!;
    update(id, 'technologies', proj.technologies.filter(t => t !== tech));
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <p className="text-gray-500 text-sm mt-1">Showcase your notable projects and side work.</p>
      </div>

      <div className="space-y-4">
        {data.map((proj, index) => (
          <div key={proj.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div
              className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-bold">{index + 1}</span>
                <p className="font-semibold text-gray-900 text-sm">{proj.name || 'Untitled Project'}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={e => { e.stopPropagation(); removeProject(proj.id); }}
                  className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expanded === proj.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {expanded === proj.id && (
              <div className="px-6 pb-6 border-t border-gray-50 space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Project Name</label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={e => update(proj.id, 'name', e.target.value)}
                    placeholder="AI Resume Builder"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
                  <textarea
                    value={proj.description}
                    onChange={e => update(proj.id, 'description', e.target.value)}
                    placeholder="A web application that uses AI to generate professional resumes from user input."
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Technologies</label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {proj.technologies.map(tech => (
                      <span key={tech} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs">
                        {tech}
                        <button onClick={() => removeTech(proj.id, tech)} className="text-gray-400 hover:text-red-400 transition-colors">
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={techInput[proj.id] || ''}
                      onChange={e => setTechInput(prev => ({ ...prev, [proj.id]: e.target.value }))}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech(proj.id))}
                      placeholder="React, Node.js..."
                      className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                    />
                    <button
                      onClick={() => addTech(proj.id)}
                      className="px-3.5 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addProject}
          className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-6 flex flex-col items-center gap-2 text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/30 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Add Project</span>
        </button>
      </div>
    </div>
  );
}
