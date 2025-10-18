// utils/resources.ts
// Utility functions to format resource values for display

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
 * Format CPU value in cores (e.g., 1 = 1 vCPU, 0.25 = 250m)
 */
export function formatCpu(cpu?: number | null): string {
  if (cpu == null || isNaN(cpu)) return '0 m';
  if (cpu >= 1) {
    // Show in vCPU
    return formatUnit(cpu, [
      { label: 'm', value: 0.001 },
      { label: 'vCPU', value: 1 },
    ]);
  }
  // Show in millicores
  return `${Math.round(cpu * 1000)}m`;
}

/**
 * Format memory value in bytes (auto: B, KB, MB, GB, TB)
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
 * Format memory value in bytes (same as formatMemoryBytes, for consistency)
 */
export function formatMemory(memory?: number | null): string {
  return formatMemoryBytes(memory);
}

/**
 * Format storage value in bytes (auto: B, KB, MB, GB, TB, PB)
 */
export function formatStorage(storage?: number | null): string {
  return formatUnit(storage, [
    { label: 'B', value: 1 },
    { label: 'KB', value: 1024 },
    { label: 'MB', value: 1024 ** 2 },
    { label: 'GB', value: 1024 ** 3 },
    { label: 'TB', value: 1024 ** 4 },
    { label: 'PB', value: 1024 ** 5 },
  ]);
}

/**
 * Format price in paise to INR string (e.g., 49900 = ₹499.00)
 */
export function formatPrice(pricePaise?: number | string | null): string {
  if (pricePaise == null || pricePaise === '' || isNaN(Number(pricePaise))) return '₹0.00';
  const price = typeof pricePaise === 'string' ? parseInt(pricePaise, 10) : pricePaise;
  return `₹${(price / 100).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
