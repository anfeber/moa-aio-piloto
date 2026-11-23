export type Tone = 'green' | 'amber' | 'red' | 'cyan' | 'slate'

// Cada color se traduce a una clase de Tailwind
const toneClass: Record<Tone, string> = {
  green: 'text-emerald-400', amber: 'text-amber-400', red: 'text-red-400',
  cyan: 'text-cyan-400', slate: 'text-slate-100',
}

export function KpiCard({ label, value, unit, hint, tone = 'slate', bar }: {
  label: string; value: string | number; unit?: string; hint?: string
  tone?: Tone; bar?: number // bar = porcentaje (0-100) para la barra de progreso
}) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${toneClass[tone]}`}>
        {value} {unit && <span className="text-sm font-normal text-slate-400">{unit}</span>}
      </p>
      {bar !== undefined && (
        <div className="mt-2 h-1.5 rounded bg-slate-700">
          <div className="h-1.5 rounded bg-emerald-400" style={{ width: `${Math.min(bar, 100)}%` }} />
        </div>
      )}
      {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}