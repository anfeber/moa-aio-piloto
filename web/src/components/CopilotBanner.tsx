import { useState } from 'react'

export function CopilotBanner({ text, savings }: { text: string; savings: number }) {
  const [open, setOpen] = useState(true)
  if (!open) return null
  return (
    <div className="fixed bottom-6 left-1/2 w-[min(900px,92vw)] -translate-x-1/2 rounded-2xl border border-violet-500/50 bg-[#12102b] p-4 shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-violet-300">
            COPILOT INSIGHTS EN TIEMPO REAL{' '}
            <span className="ml-2 rounded-full bg-violet-500/20 px-2 py-0.5 font-normal">
              FinOps Ahorro: +${savings}/mes
            </span>
          </p>
          <p className="mt-1 text-sm">{text}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold hover:bg-violet-500">
            Aplicar recomendación
          </button>
          <button onClick={() => setOpen(false)} aria-label="Cerrar" className="text-slate-400">✕</button>
        </div>
      </div>
    </div>
  )
}