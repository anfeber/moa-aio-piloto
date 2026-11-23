import type { ReactNode } from 'react'

export function Section({ title, subtitle, badge, children }: {
  title: string; subtitle: string; badge?: string; children: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-700/60 bg-[#0d1224] p-5">
      <header className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide">{title}</h2>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
        {badge && (
          <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            {badge}
          </span>
        )}
      </header>
      {children}
    </section>
  )
}