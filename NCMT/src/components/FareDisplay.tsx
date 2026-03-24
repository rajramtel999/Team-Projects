interface FareDisplayProps {
  amount: number;
}

export default function FareDisplay({ amount }: FareDisplayProps) {
  return (
    <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4 sm:p-3 text-center">
      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Fare</p>
      <p className="text-2xl sm:text-lg font-bold text-emerald-800">
        <span className="text-sm font-normal">₨</span>{amount}
      </p>
    </div>
  );
}
