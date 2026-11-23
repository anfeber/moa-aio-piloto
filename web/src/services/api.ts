import type { Overview } from '../types'
import { mockOverview } from './mockData'

// En tu computador (.env.development) vale "true"; en producción no existe y usa la API real
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export async function getOverview(): Promise<Overview> {
  if (USE_MOCK) return mockOverview

  // /api/... lo atiende la Function App vinculada a la Static Web App
  const res = await fetch('/api/overview')
  if (!res.ok) throw new Error(`La API respondió ${res.status}`)
  return res.json()
}

// Usuario autenticado: la SWA expone /.auth/me con los datos del login
export async function getUserName(): Promise<string> {
  if (USE_MOCK) return 'Usuario Demo'
  try {
    const res = await fetch('/.auth/me')
    const data = await res.json()
    return data.clientPrincipal?.userDetails ?? 'Desconocido'
  } catch {
    return 'Desconocido'
  }
}