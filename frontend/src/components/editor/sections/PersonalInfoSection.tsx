import { PersonalInfo } from '../../../types/resume';

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const fields: { key: keyof PersonalInfo; label: string; placeholder: string; type?: string }[] = [
  { key: 'name', label: 'Full Name', placeholder: 'Alex Morgan' },
  { key: 'email', label: 'Email', placeholder: 'alex@example.com', type: 'email' },
  { key: 'phone', label: 'Phone', placeholder: '+1 (555) 123-4567' },
  { key: 'location', label: 'Location', placeholder: 'San Francisco, CA' },
  { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'linkedin.com/in/alexmorgan' },
  { key: 'website', label: 'Website / Portfolio', placeholder: 'alexmorgan.dev' },
];

export function PersonalInfoSection({ data, onChange }: Props) {
  const handleChange = (key: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personal Info</h2>
        <p className="text-gray-500 text-sm mt-1">Your contact information appears at the top of your resume.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {fields.map(field => (
            <div key={field.key} className={field.key === 'name' ? 'sm:col-span-2' : ''}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                {field.label}
              </label>
              <input
                type={field.type || 'text'}
                value={data[field.key] || ''}
                onChange={e => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
