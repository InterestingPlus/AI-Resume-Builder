interface Props {
  data: string;
  onChange: (data: string) => void;
}

export function SummarySection({ data, onChange }: Props) {
  const wordCount = data.trim() ? data.trim().split(/\s+/).length : 0;
  const charCount = data.length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Professional Summary</h2>
        <p className="text-gray-500 text-sm mt-1">A brief overview of your career, skills, and what you bring to the role.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Summary</label>
          <span className="text-xs text-gray-400">{wordCount} words &bull; {charCount} chars</span>
        </div>

        <textarea
          value={data}
          onChange={e => onChange(e.target.value)}
          placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications. Proven track record of delivering high-quality solutions that improve user experience and drive business growth. Passionate about clean code, team collaboration, and continuous learning."
          rows={6}
          className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition resize-none leading-relaxed"
        />

        <div className="mt-3 space-y-1.5">
          <p className="text-xs text-gray-400 font-medium">Tips for a strong summary:</p>
          <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
            <li>Aim for 2-4 sentences (40-80 words)</li>
            <li>Start with your job title and years of experience</li>
            <li>Mention 2-3 key skills relevant to the target role</li>
            <li>Highlight a key achievement or value you bring</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
