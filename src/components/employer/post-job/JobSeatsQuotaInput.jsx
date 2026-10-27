import React from 'react';
import {
  Lock,
  Minus,
  Plus,
  Users,
  EyeOff,
  Sparkles,
} from 'lucide-react';

export const JobSeatsQuotaInput = ({ totalSeats, onChangeSeats }) => {
  const presets = [
    { label: '1 Seat', value: 1 },
    { label: '2 Seats', value: 2 },
    { label: '5 Seats', value: 5 },
    { label: '10+ Seats', value: 10 },
  ];

  const handleIncrement = () => {
    onChangeSeats(Math.min(99, Number(totalSeats || 1) + 1));
  };

  const handleDecrement = () => {
    onChangeSeats(Math.max(1, Number(totalSeats || 1) - 1));
  };

  const handleManualChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      onChangeSeats(1);
    } else {
      onChangeSeats(Math.max(1, Math.min(100, val)));
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl 2xl:rounded-3xl p-6 2xl:p-8 3xl:p-10 shadow-2xs space-y-4 2xl:space-y-6">
      {/* Header with HR Badge */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate">
              3. Total Seats & Internal Headcount Quota
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 truncate">
            Configure internal headcount capacity and recruitment targets for this opening.
          </p>
        </div>

        {/* Private HR Indicator Badge */}
        <div className="bg-amber-50 text-amber-800 border border-amber-200/90 font-semibold px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 shrink-0 whitespace-nowrap shadow-2xs">
          <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span className="whitespace-nowrap">Internal HR Quota</span>
        </div>
      </div>

      {/* Prominent Confidential Notice Banner */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
          <EyeOff className="w-4 h-4" />
        </div>
        <div className="space-y-1 min-w-0">
          <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <span>🔒 HR Confidential: Total seats count is strictly visible to internal HR & Recruiters only.</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            It is 100% hidden from candidates to maximize application volume. Candidates will only see that your organization is actively hiring for this position.
          </p>
        </div>
      </div>

      {/* Stepper + Quick Presets Container */}
      <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
        {/* Row 1: Target Headcount Stepper */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200/70">
          <div className="space-y-0.5 min-w-0">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Target Headcount (Vacancies):</span>
            </span>
            <p className="text-[11px] text-slate-500">
              Total candidate hiring capacity approved for this job
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-center shrink-0">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={totalSeats <= 1}
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
              aria-label="Decrease seats"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="relative">
              <input
                type="number"
                min="1"
                max="100"
                value={totalSeats}
                onChange={handleManualChange}
                className="w-20 h-9 bg-white text-center font-bold text-base text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all shadow-2xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <button
              type="button"
              onClick={handleIncrement}
              disabled={totalSeats >= 100}
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
              aria-label="Increase seats"
            >
              <Plus className="w-4 h-4" />
            </button>

            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap pl-1">
              {totalSeats === 1 ? 'Seat' : 'Seats'}
            </span>
          </div>
        </div>

        {/* Row 2: Quick Presets */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-semibold text-slate-600 shrink-0">
            Quick Headcount Presets:
          </span>

          <div className="grid grid-cols-4 gap-2 w-full sm:w-auto">
            {presets.map((preset) => {
              const isActive = Number(totalSeats) === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => onChangeSeats(preset.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border text-center whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Internal Analytics Preview Helper */}
      <div className="text-[11px] text-slate-500 flex items-center gap-2 px-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span className="leading-relaxed">
          Allocating <strong className="font-semibold text-slate-800">{totalSeats} {totalSeats === 1 ? 'seat' : 'seats'}</strong> will update your company dashboard's seat utilization meter.
        </span>
      </div>
    </div>
  );
};

export default JobSeatsQuotaInput;
