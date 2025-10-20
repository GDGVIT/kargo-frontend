// utils/resources.ts
// Utility functions to format resource values for display
// NOTE: Backend expects and stores resource values in the following base units:
// - CPU in millicores (m)
// - Memory in megabytes (MB)
// - Storage in gigabytes (GB)
// The formatters below assume inputs are already in these base units and render
// user-friendly strings (promoting to vCPU/GB/TB where appropriate).

/**
 * Generic function to format a value with the most appropriate unit.
 * @param value The numeric value to format
 * @param units Array of units, each with a label and the value it represents
 * @param options Optional: { fixed, minUnitIndex }
 */
export function formatUnit(
  value?: number | null,
  units?: { label: string; value: number }[],
  options?: { fixed?: number; minUnitIndex?: number }
): string {
  if (value == null || isNaN(value)) return `0 ${units?.[0]?.label ?? ''}`;
  const absValue = Math.abs(value);
  let idx = 0;
  if (units && units.length > 1) {
    for (let i = units.length - 1; i >= (options?.minUnitIndex ?? 0); i--) {
      if (absValue >= units[i].value) {
        idx = i;
        break;
      }
    }
  }
  const divisor = units?.[idx]?.value ?? 1;
  const fixed = options?.fixed ?? (idx === 0 ? 0 : 2);
  return `${(value / divisor).toFixed(fixed)} ${units?.[idx]?.label ?? ''}`;
}

/**
 * Format CPU where input is in cores (decimal). This keeps compatibility for charts/metrics
 * that deal in cores directly.
 */
export function formatCpu(cores?: number | null): string {
  if (cores == null || isNaN(cores)) return '0 m';
  if (cores < 1) return `${Math.round(cores * 1000)} m`;
  return `${cores.toFixed(cores >= 10 ? 0 : 2)} vCPU`;
}

/**
 * Format CPU where input is millicores (m). Use this for plan/base values.
 */
export function formatCpuMilli(m?: number | null): string {
  if (m == null || isNaN(m)) return '0 m';
  if (m < 1000) return `${Math.round(m)} m`;
  const cores = m / 1000;
  return `${cores.toFixed(cores >= 10 ? 0 : 2)} vCPU`;
}

/**
 * Format memory when input is in BYTES (auto: B, KB, MB, GB, TB)
 * Used by metrics and places that deal with raw byte counts.
 */
export function formatMemoryBytes(memoryBytes?: number | null): string {
  return formatUnit(memoryBytes, [
    { label: 'B', value: 1 },
    { label: 'KB', value: 1024 },
    { label: 'MB', value: 1024 ** 2 },
    { label: 'GB', value: 1024 ** 3 },
    { label: 'TB', value: 1024 ** 4 },
  ]);
}

/**
 * Format memory where input is megabytes (MB). Auto-promote to GB/TB.
 */
export function formatMemory(memory?: number | null): string {
  if (memory == null || isNaN(memory)) return '0 MB';
  // memory is in MB
  if (memory < 1024) return `${Math.round(memory)} MB`;
  const gb = memory / 1024;
  if (gb < 1024) return `${gb.toFixed(gb >= 10 ? 0 : 2)} GB`;
  const tb = gb / 1024;
  return `${tb.toFixed(tb >= 10 ? 0 : 2)} TB`;
}

/**
 * Format storage where input is gigabytes (GB). Auto-promote to TB/PB.
 */
export function formatStorage(storage?: number | null): string {
  if (storage == null || isNaN(storage)) return '0 GB';
  // storage is in GB
  if (storage < 1024) return `${Math.round(storage)} GB`;
  const tb = storage / 1024;
  if (tb < 1024) return `${tb.toFixed(tb >= 10 ? 0 : 2)} TB`;
  const pb = tb / 1024;
  return `${pb.toFixed(pb >= 10 ? 0 : 2)} PB`;
}
