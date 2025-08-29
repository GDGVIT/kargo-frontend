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
  if (value == null || isNaN(value)) return `0 ${units?.[0]?.label ?? ""}`;
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
  return `${(value / divisor).toFixed(fixed)} ${units?.[idx]?.label ?? ""}`;
}

/**
 * Format CPU value in milli (e.g., 1000 = 1 vCPU, 20 = 20m)
 */
export function formatCpu(cpuMilli?: number | null): string {
  if (cpuMilli == null || isNaN(cpuMilli)) return "0 m";
  if (cpuMilli >= 1000) {
    // Show in vCPU
    return formatUnit(cpuMilli, [
      { label: "m", value: 1 },
      { label: "vCPU", value: 1000 },
    ]);
  }
  return `${cpuMilli}m`;
}

/**
 * Format memory value in bytes (auto: B, KB, MB, GB, TB)
 */
export function formatMemoryBytes(memoryBytes?: number | null): string {
  return formatUnit(memoryBytes, [
    { label: "B", value: 1 },
    { label: "KB", value: 1024 },
    { label: "MB", value: 1024 ** 2 },
    { label: "GB", value: 1024 ** 3 },
    { label: "TB", value: 1024 ** 4 },
  ]);
}

/**
 * Format memory value in MB (e.g., 1024 = 1 GB, 512 = 512 MB)
 */
export function formatMemory(memoryMB?: number | null): string {
  if (memoryMB == null || isNaN(memoryMB)) return "0 MB";
  // Convert MB to bytes and use formatMemoryBytes
  return formatMemoryBytes(memoryMB * 1024 * 1024);
}

/**
 * Format storage value in GB (auto: GB, TB, PB)
 */
export function formatStorage(storageGB?: number | null): string {
  return formatUnit(storageGB, [
    { label: "GB", value: 1 },
    { label: "TB", value: 1024 },
    { label: "PB", value: 1024 * 1024 },
  ]);
}

/**
 * Format price in paise to INR string (e.g., 49900 = ₹499.00)
 */
export function formatPrice(pricePaise?: number | string | null): string {
  if (pricePaise == null || pricePaise === "" || isNaN(Number(pricePaise)))
    return "₹0.00";
  const price =
    typeof pricePaise === "string" ? parseInt(pricePaise, 10) : pricePaise;
  return `₹${(price / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
