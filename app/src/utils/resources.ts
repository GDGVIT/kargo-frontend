// utils/resources.ts
// Utility functions to format resource values for display

/**
 * Format CPU value in milli (e.g., 1000 = 1 vCPU, 20 = 20m)
 */
export function formatCpu(cpuMilli?: number | null): string {
  if (cpuMilli == null || isNaN(cpuMilli)) return "0 m";
  if (cpuMilli >= 1000) {
    // Show in vCPU
    return `${(cpuMilli / 1000).toFixed(cpuMilli % 1000 === 0 ? 0 : 2)} vCPU`;
  }
  return `${cpuMilli}m`;
}

/**
 * Format memory value in MB (e.g., 1024 = 1 GB, 512 = 512 MB)
 */
export function formatMemory(memoryMB?: number | null): string {
  if (memoryMB == null || isNaN(memoryMB)) return "0 MB";
  if (memoryMB >= 1024) {
    return `${(memoryMB / 1024).toFixed(memoryMB % 1024 === 0 ? 0 : 2)} GB`;
  }
  return `${memoryMB} MB`;
}

/**
 * Format storage value in GB (e.g., 10 = 10 GB, 0.5 = 512 MB)
 */
export function formatStorage(storageGB?: number | null): string {
  if (storageGB == null || isNaN(storageGB)) return "0 GB";
  if (storageGB >= 1) {
    return `${storageGB % 1 === 0 ? storageGB : storageGB.toFixed(2)} GB`;
  }
  // Show in MB if less than 1 GB
  return `${Math.round(storageGB * 1024)} MB`;
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
