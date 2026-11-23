import type { Overview } from '../types'

export const mockOverview: Overview = {
  health: { score: 94, status: 'ok', high: 0, medium: 3, low: 6 },
  savings: { monthlyUsd: 4200, recommendations: 5 },
  tags: { totalResources: 1420, resourceGroups: 18, coveragePct: 98.2, missing: 14 },
  orphans: { disks: 2, sizeGb: 1000, estMonthlyUsd: 85 },
  generatedAt: new Date().toISOString(),
}