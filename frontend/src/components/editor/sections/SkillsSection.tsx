import { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';

interface Props {
  data: string[];
  onChange: (data: string[]) => void;
}

export function SkillsSection({ data, onChange }: Props) {
  const [input, setInput] = useState('');

  const addSkill = (value: string) => {
    const skill = value.trim();
    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
    }
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(input);
    }
  };

  const removeSkill = (skill: string) => {
    onChange(data.filter(s => s !== skill));
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    const skills = pasted.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
    const newSkills = skills.filter(s => !data.includes(s));
    onChange([...data, ...newSkills]);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
        <p className="text-gray-500 text-sm mt-1">Add your technical and professional skills. Press Enter or comma to add.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
          {data.map(skill => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full text-sm font-medium"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="text-blue-400 hover:text-blue-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder="Type a skill and press Enter..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
          />
          <button
            onClick={() => addSkill(input)}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          You can also paste a comma-separated list of skills.
        </p>

        {data.length === 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
            <p className="text-sm text-gray-400">No skills added yet. Start by typing a skill above.</p>
          </div>
        )}
      </div>

      {data.length > 0 && (
        <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{data.length} skills added</p>
          <p className="text-xs text-gray-500">Tip: Add 8-12 relevant skills for the best ATS compatibility.</p>
        </div>
      )}
    </div>
  );
}
