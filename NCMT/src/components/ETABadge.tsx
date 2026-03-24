interface ETABadgeProps {
  label: string;
  minutes: number;
  tone?: 'slate' | 'emerald';
}

const toneClasses = {
  slate: 'border-slate-200 bg-slate-50 text-slate-800',
  emerald: 'border-emerald-100 bg-emerald-50 text-emerald-800',
};

export default function ETABadge({ label, minutes, tone = 'slate' }: ETABadgeProps) {
  return (
    <div className={`rounded-lg border-2 p-4 sm:p-3 text-center ${toneClasses[tone]}`}>
      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl sm:text-lg font-bold">{minutes} <span className="text-xs font-normal">min</span></p>
    </div>
  );
}
