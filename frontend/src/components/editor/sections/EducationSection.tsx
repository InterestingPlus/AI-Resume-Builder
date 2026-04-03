import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { EducationItem } from '../../../types/resume';

interface Props {
  data: EducationItem[];
  onChange: (data: EducationItem[]) => void;
}

function generateId() {
  return `edu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

const emptyEdu = (): EducationItem => ({
  id: generateId(),
  degree: '',
  institution: '',
  start_date: '',
  end_date: '',
  gpa: '',
});

export function EducationSection({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(data[0]?.id || null);

  const update = (id: string, field: keyof EducationItem, value: string) => {
    onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addEdu = () => {
    const newEdu = emptyEdu();
    onChange([...data, newEdu]);
    setExpanded(newEdu.id);
  };

  const removeEdu = (id: string) => {
    onChange(data.filter(e => e.id !== id));
    if (expanded === id) setExpanded(data.find(e => e.id !== id)?.id || null);
  };

  const fields: { key: keyof EducationItem; label: string; placeholder: string; span?: boolean }[] = [
    { key: 'degree', label: 'Degree / Certification', placeholder: 'Bachelor of Science in Computer Science' },
    { key: 'institution', label: 'Institution', placeholder: 'University of California, Berkeley' },
    { key: 'start_date', label: 'Start Year', placeholder: '2019' },
    { key: 'end_date', label: 'End Year', placeholder: '2023' },
    { key: 'gpa', label: 'GPA (Optional)', placeholder: '3.8 / 4.0' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <p className="text-gray-500 text-sm mt-1">List your educational background starting with the most recent.</p>
      </div>

      <div className="space-y-4">
        {data.map((edu, index) => (
          <div key={edu.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div
              className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === edu.id ? null : edu.id)}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-bold">{index + 1}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{edu.degree || 'Untitled Degree'}</p>
                  {edu.institution && <p className="text-xs text-gray-400">{edu.institution}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={e => { e.stopPropagation(); removeEdu(edu.id); }}
                  className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expanded === edu.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {expanded === edu.id && (
              <div className="px-6 pb-6 border-t border-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {fields.map(field => (
                    <div key={field.key} className={field.key === 'degree' || field.key === 'institution' ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{field.label}</label>
                      <input
                        type="text"
                        value={edu[field.key] || ''}
                        onChange={e => update(edu.id, field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addEdu}
          className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-6 flex flex-col items-center gap-2 text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/30 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Add Education</span>
        </button>
      </div>
    </div>
  );
}
