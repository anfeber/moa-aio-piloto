export type Status = 'ok' | 'warn' | 'critical'

export interface Overview {
  health: { score: number; status: Status; high: number; medium: number; low: number }
  savings: { monthlyUsd: number; recommendations: number }
  tags: { totalResources: number; resourceGroups: number; coveragePct: number; missing: number }
  orphans: { disks: number; sizeGb: number; estMonthlyUsd: number }
  generatedAt: string
}