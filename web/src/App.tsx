import { useEffect, useState } from 'react'
import type { Overview } from './types'
import { getOverview, getUserName } from './services/api'
import { Section } from './components/Section'
import { KpiCard } from './components/KpiCard'
import { CopilotBanner } from './components/CopilotBanner'

// Semáforo WAF: verde / ámbar / rojo según el estado
const healthTone = { ok: 'green', warn: 'amber', critical: 'red' } as const

export default function App() {
  const [data, setData] = useState<Overview | null>(null)
  const [user, setUser] = useState('...')
  const [error, setError] = useState<string | null>(null)

  // Al abrir la página: pide los datos y el nombre del usuario
  useEffect(() => {
    getOverview().then(setData).catch((e) => setError(e.message))
    getUserName().then(setUser)
  }, [])

  if (error) return <p className="p-8 text-red-400">Error cargando datos: {error}</p>
  if (!data) return <p className="p-8 text-slate-400">Cargando…</p>

  const { health, savings, tags, orphans } = data

  return (
    <div className="mx-auto max-w-7xl p-6 pb-40">
      {/* Encabezado */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Portal MOA AIO <span className="text-xs text-violet-400">piloto</span></h1>
          <p className="text-xs text-slate-400">Centro de Operaciones Inteligentes en la Nube / Well-Architected Framework</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>{user}</span>
          <a href="/.auth/logout" className="text-slate-400 underline">Salir</a>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Inicio" subtitle="Salud y ahorros globales" badge={health.status === 'ok' ? 'Operación Nominal' : 'Requiere atención'}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <KpiCard label="Salud WAF" value={health.score} unit="/100" tone={healthTone[health.status]} bar={health.score}
              hint={`Advisor: ${health.high} alto · ${health.medium} medio · ${health.low} bajo`} />
            <KpiCard label="Ahorros Advisor" value={`$${savings.monthlyUsd.toLocaleString()}`} unit="/mes" tone="cyan"
              hint={`${savings.recommendations} recomendaciones de costo`} />
            <KpiCard label="Alertas altas" value={health.high} tone={health.high ? 'red' : 'green'} hint="Impacto alto en Advisor" />
          </div>
        </Section>

        <Section title="Línea Base" subtitle="Inventario de activos y gobierno" badge="ARG Synced">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <KpiCard label="Recursos totales" value={tags.totalResources.toLocaleString()} hint={`En ${tags.resourceGroups} Resource Groups`} />
            <KpiCard label="Cobertura Tags" value={`${tags.coveragePct}%`} tone="green" bar={tags.coveragePct} />
            <KpiCard label="Sin Tag" value={tags.missing} unit="items" tone="amber" hint="Requiere Policy" />
            <KpiCard label="Discos huérfanos" value={orphans.disks} unit="unattached" tone="amber"
              hint={`~$${orphans.estMonthlyUsd}/mes residual`} />
          </div>
        </Section>
      </div>

      {/* Recomendación simulada, armada con los datos */}
      <CopilotBanner
        savings={savings.monthlyUsd}
        text={`Se detectaron ${orphans.disks} discos sin asignar (${orphans.sizeGb} GB) y ${tags.missing} recursos sin tags obligatorios. Remediar con 1-clic.`}
      />
    </div>
  )
}