function toFixed(value: number, digits = 2): string {
  return parseFloat(value.toString()).toFixed(digits);
}

/** Format CPU (backend number -> "x.xx vCPU") */
export function formatCpu(cpu?: number): string {
  if (!cpu) return "0 vCPU";
  return `${toFixed(cpu / 100)} vCPU`;
}

/** Format Memory (MB -> MiB/GiB readable) */
export function formatMemory(memory?: number): string {
  if (!memory) return "0 MiB";
  const inMiB = memory;
  if (inMiB >= 1024) return `${toFixed(inMiB / 1024)} GiB`;
  return `${toFixed(inMiB)} MiB`;
}

/** Format Storage (GB -> GiB readable) */
export function formatStorage(storage?: number): string {
  if (!storage) return "0 GiB";
  return `${toFixed(storage)} GiB`;
}

/** Parse CPU ("1 vCPU", "0.5", "100") -> backend millicores */
export function parseCpu(input?: string | number): number {
  if (input === undefined || input === null || input === "") return 0;
  const str =
    typeof input === "string" ? input.replace(/[^\d.]/g, "") : String(input);
  const val = parseFloat(str);
  return isNaN(val) ? 0 : Math.round(val * 100);
}

/** Parse Memory ("512Mi", "2Gi", "1G", "256") -> MB */
export function parseMemory(input?: string | number): number {
  if (input === undefined || input === null || input === "") return 0;
  const str = typeof input === "string" ? input.trim() : String(input);
  const val = parseFloat(str);

  if (isNaN(val)) return 0;
  if (str.endsWith("Gi") || str.endsWith("G")) return val * 1024;
  return val; // Treat as MiB or MB
}

/** Parse Storage ("10Gi", "10240Mi", "10000M", "10000") -> GB */
export function parseStorage(input?: string | number): number {
  if (input === undefined || input === null || input === "") return 0;
  const str = typeof input === "string" ? input.trim() : String(input);
  const val = parseFloat(str);

  if (isNaN(val)) return 0;
  if (str.endsWith("Mi") || str.endsWith("M")) return val / 1024;
  if (str.endsWith("Gi") || str.endsWith("G")) return val;
  return val; // Assume GB if plain number
}

/** Format money from paise to INR (e.g. 12345 -> ₹123.45) */
export function formatMoney(paise?: string | number): string {
  if (paise === undefined || paise === null || paise === "") return "₹0.00";
  const val = typeof paise === "string" ? parseFloat(paise) : paise;
  if (isNaN(val)) return "₹0.00";
  return `₹${(val / 100).toFixed(2)}`;
}
