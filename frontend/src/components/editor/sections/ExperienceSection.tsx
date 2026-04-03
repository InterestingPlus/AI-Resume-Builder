import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ExperienceItem } from '../../../types/resume';
import { Button } from '../../ui/Button';

interface Props {
  data: ExperienceItem[];
  onChange: (data: ExperienceItem[]) => void;
}

function generateId() {
  return `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

const emptyExp = (): ExperienceItem => ({
  id: generateId(),
  job_title: '',
  company: '',
  start_date: '',
  end_date: '',
  is_current: false,
  location: '',
  description: [''],
});

export function ExperienceSection({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(data[0]?.id || null);

  const update = (id: string, field: keyof ExperienceItem, value: unknown) => {
    onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const updateDesc = (id: string, index: number, value: string) => {
    const exp = data.find(e => e.id === id)!;
    const newDesc = [...exp.description];
    newDesc[index] = value;
    update(id, 'description', newDesc);
  };

  const addDesc = (id: string) => {
    const exp = data.find(e => e.id === id)!;
    update(id, 'description', [...exp.description, '']);
  };

  const removeDesc = (id: string, index: number) => {
    const exp = data.find(e => e.id === id)!;
    update(id, 'description', exp.description.filter((_, i) => i !== index));
  };

  const addExp = () => {
    const newExp = emptyExp();
    onChange([...data, newExp]);
    setExpanded(newExp.id);
  };

  const removeExp = (id: string) => {
    onChange(data.filter(e => e.id !== id));
    if (expanded === id) setExpanded(data.find(e => e.id !== id)?.id || null);
  };

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
        <p className="text-gray-500 text-sm mt-1">Highlight your professional background to show your impact.</p>
      </div>

      <div className="space-y-4">
        {data.map((exp, index) => (
          <div key={exp.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div
              className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpand(exp.id)}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">{index + 1}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {exp.job_title || 'Untitled Position'}
                  </p>
                  {exp.company && <p className="text-xs text-gray-400">{exp.company}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={e => { e.stopPropagation(); removeExp(exp.id); }}
                  className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expanded === exp.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {expanded === exp.id && (
              <div className="px-6 pb-6 border-t border-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Job Title</label>
                    <input
                      type="text"
                      value={exp.job_title}
                      onChange={e => update(exp.id, 'job_title', e.target.value)}
                      placeholder="Senior Product Designer"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Company Name</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={e => update(exp.id, 'company', e.target.value)}
                      placeholder="TechFlow Solutions"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Start Date</label>
                    <input
                      type="text"
                      value={exp.start_date}
                      onChange={e => update(exp.id, 'start_date', e.target.value)}
                      placeholder="January 2020"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">End Date</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={exp.is_current ? 'Present' : exp.end_date}
                        onChange={e => update(exp.id, 'end_date', e.target.value)}
                        placeholder="Present"
                        disabled={exp.is_current}
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition disabled:bg-gray-50 disabled:text-gray-400"
                      />
                      <label className="flex items-center gap-1.5 cursor-pointer whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={exp.is_current}
                          onChange={e => update(exp.id, 'is_current', e.target.checked)}
                          className="rounded accent-blue-600"
                        />
                        <span className="text-xs text-gray-500">Current</span>
                      </label>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={e => update(exp.id, 'location', e.target.value)}
                      placeholder="San Francisco, CA (Remote)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</label>
                      <button
                        onClick={() => addDesc(exp.id)}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Bullet Point
                      </button>
                    </div>
                    <div className="space-y-2">
                      {exp.description.map((desc, di) => (
                        <div key={di} className="flex items-start gap-2">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                          <input
                            type="text"
                            value={desc}
                            onChange={e => updateDesc(exp.id, di, e.target.value)}
                            placeholder="Led the design team for the core product, resulting in a 20% increase in user retention."
                            className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                          />
                          {exp.description.length > 1 && (
                            <button
                              onClick={() => removeDesc(exp.id, di)}
                              className="mt-2 text-gray-300 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Tip: Use action verbs and quantify your achievements.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addExp}
          className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-6 flex flex-col items-center gap-2 text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/30 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Add Another Position</span>
        </button>
      </div>
    </div>
  );
}
