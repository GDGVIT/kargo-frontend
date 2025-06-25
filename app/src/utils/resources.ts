// Resource utility functions for backend number format (cpu: milli, memory: MB, storage: GB)

function toFixed(value: number, digits = 2): string {
  return parseFloat(value.toString()).toFixed(digits);
}

/** Format CPU (milli -> "x.xx vCPU") */
export function formatCpu(cpuMilli?: number): string {
  if (!cpuMilli) return "0 vCPU";
  return `${toFixed(cpuMilli / 1000)} vCPU`;
}

/** Format Memory (MB -> MiB/GiB readable) */
export function formatMemory(memoryMB?: number): string {
  if (!memoryMB) return "0 MiB";
  if (memoryMB >= 1024) return `${toFixed(memoryMB / 1024)} GiB`;
  return `${toFixed(memoryMB)} MiB`;
}

/** Format Storage (GB -> GiB readable) */
export function formatStorage(storageGB?: number): string {
  if (!storageGB) return "0 GiB";
  return `${toFixed(storageGB)} GiB`;
}

/** Parse CPU input (UI string/number) -> backend milli */
export function parseCpu(input?: string | number): number {
  if (input === undefined || input === null || input === "") return 0;
  const str =
    typeof input === "string" ? input.replace(/[^\d.]/g, "") : String(input);
  const val = parseFloat(str);
  if (isNaN(val)) return 0;
  // If input contains 'm', treat as millicores
  if (typeof input === "string" && input.toLowerCase().includes("m")) {
    return Math.round(val);
  }
  // Otherwise, treat as vCPU (1 vCPU = 1000m)
  return Math.round(val * 1000);
}

/** Parse Memory input (UI string/number) -> backend MB */
export function parseMemory(input?: string | number): number {
  if (input === undefined || input === null || input === "") return 0;
  const str = typeof input === "string" ? input.trim() : String(input);
  const val = parseFloat(str);
  if (isNaN(val)) return 0;
  if (typeof input === "string") {
    if (str.toLowerCase().endsWith("gib") || str.toLowerCase().endsWith("gi")) {
      return Math.round(val * 1024); // GiB to MiB
    }
    if (str.toLowerCase().endsWith("gb") || str.toLowerCase().endsWith("g")) {
      return Math.round(val * 1000); // GB to MB (decimal)
    }
    if (str.toLowerCase().endsWith("mib") || str.toLowerCase().endsWith("mi")) {
      return Math.round(val); // MiB
    }
    if (str.toLowerCase().endsWith("mb") || str.toLowerCase().endsWith("m")) {
      return Math.round(val); // MB
    }
  }
  return Math.round(val); // Assume MB if plain number
}

/** Parse Storage input (UI string/number) -> backend GB */
export function parseStorage(input?: string | number): number {
  if (input === undefined || input === null || input === "") return 0;
  const str = typeof input === "string" ? input.trim() : String(input);
  const val = parseFloat(str);
  if (isNaN(val)) return 0;
  if (typeof input === "string") {
    if (str.toLowerCase().endsWith("gib") || str.toLowerCase().endsWith("gi")) {
      return Math.round(val); // GiB to GB (treat as GB)
    }
    if (str.toLowerCase().endsWith("gb") || str.toLowerCase().endsWith("g")) {
      return Math.round(val); // GB
    }
    if (str.toLowerCase().endsWith("mib") || str.toLowerCase().endsWith("mi")) {
      return Math.round(val / 1024); // MiB to GB
    }
    if (str.toLowerCase().endsWith("mb") || str.toLowerCase().endsWith("m")) {
      return Math.round(val / 1000); // MB to GB (decimal)
    }
  }
  return Math.round(val); // Assume GB if plain number
}

/** Format money from paise to INR (e.g. 12345 -> ₹123.45) */
export function formatMoney(paise?: string | number): string {
  if (paise === undefined || paise === null || paise === "") return "₹0.00";
  const val = typeof paise === "string" ? parseFloat(paise) : paise;
  if (isNaN(val)) return "₹0.00";
  return `₹${(val / 100).toFixed(2)}`;
}
