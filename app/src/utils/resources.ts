// Utility to format CPU (e.g., 100 -> 1 vCPU, 50 -> 0.5 vCPU, 200 -> 2 vCPU)
export function formatCpu(cpu?: string | number): string {
  if (cpu === undefined || cpu === null || cpu === "") return "0 vCPU";

  let value: number | null = null;
  if (typeof cpu === "number") {
    value = cpu / 100; // 100 = 1 vCPU
  } else if (typeof cpu === "string") {
    const val = parseFloat(cpu);
    if (!isNaN(val)) value = val / 100;
  }
  if (value !== null) {
    return `${parseFloat(value.toString()).toFixed(2)} vCPU`;
  }
  return String(cpu);
}

// Utility to format memory (e.g., 1024Mi -> 1.00 GiB, 512Mi -> 0.50 GiB, 2Gi -> 2.00 GiB, 256 -> 256 MiB)
export function formatMemory(memory?: string | number): string {
  if (memory === undefined || memory === null || memory === "") return "0 MiB";

  let value: number | null = null;
  let unit = "MiB";
  if (typeof memory === "number") {
    value = memory;
  } else if (typeof memory === "string") {
    if (memory.endsWith("Mi")) {
      value = parseFloat(memory.replace("Mi", ""));
      unit = "MiB";
    } else if (memory.endsWith("Gi")) {
      value = parseFloat(memory.replace("Gi", "")) * 1024;
      unit = "GiB";
    } else if (memory.endsWith("M")) {
      value = parseFloat(memory.replace("M", ""));
      unit = "MiB";
    } else if (memory.endsWith("G")) {
      value = parseFloat(memory.replace("G", "")) * 1024;
      unit = "GiB";
    } else {
      const val = parseFloat(memory);
      if (!isNaN(val)) value = val;
    }
  }
  if (value !== null) {
    if (unit === "GiB" || value >= 1024) {
      return `${(value / 1024).toFixed(2)} GiB`;
    }
    return `${value} MiB`;
  }
  return String(memory);
}

// Utility to format storage (e.g., 10Gi -> 10 GiB, 10240Mi -> 10.00 GiB, 10000M -> 9.77 GiB, 10000 -> 10000 GiB)
export function formatStorage(storage?: string | number): string {
  if (storage === undefined || storage === null || storage === "")
    return "0 GiB";

  let value: number | null = null;
  if (typeof storage === "number") {
    value = storage; // treat as GiB
  } else if (typeof storage === "string") {
    if (storage.endsWith("Gi")) {
      value = parseFloat(storage.replace("Gi", ""));
    } else if (storage.endsWith("G")) {
      value = parseFloat(storage.replace("G", ""));
    } else if (storage.endsWith("Mi")) {
      value = parseFloat(storage.replace("Mi", "")) / 1024;
    } else if (storage.endsWith("M")) {
      value = parseFloat(storage.replace("M", "")) / 1024;
    } else {
      const val = parseFloat(storage);
      if (!isNaN(val)) value = val; // treat as GiB
    }
  }
  if (value !== null) {
    return `${parseFloat(value.toString()).toFixed(2)} GiB`;
  }
  return String(storage);
}

// Parse CPU (e.g., "100" -> 1, "50" -> 0.5, 200 -> 2)
export function parseCpu(cpu?: string | number): number {
  if (cpu === undefined || cpu === null || cpu === "") return 0;
  if (typeof cpu === "number") return cpu / 100;
  if (typeof cpu === "string") {
    const val = parseFloat(cpu);
    return isNaN(val) ? 0 : val / 100;
  }
  return 0;
}

// Parse memory string (e.g., "1024Mi", "2Gi", "512M", "1G", "256") to number (MiB)
export function parseMemory(memory?: string | number): number {
  if (memory === undefined || memory === null || memory === "") return 0;
  if (typeof memory === "number") return memory;
  if (typeof memory === "string") {
    if (memory.endsWith("Mi")) {
      const val = parseFloat(memory.replace("Mi", ""));
      return isNaN(val) ? 0 : val;
    } else if (memory.endsWith("Gi")) {
      const val = parseFloat(memory.replace("Gi", ""));
      return isNaN(val) ? 0 : val * 1024;
    } else if (memory.endsWith("M")) {
      const val = parseFloat(memory.replace("M", ""));
      return isNaN(val) ? 0 : val;
    } else if (memory.endsWith("G")) {
      const val = parseFloat(memory.replace("G", ""));
      return isNaN(val) ? 0 : val * 1024;
    } else {
      const val = parseFloat(memory);
      return isNaN(val) ? 0 : val;
    }
  }
  return 0;
}

// Parse storage string (e.g., "10Gi", "10240Mi", "10000M", "10000") to number (MiB)
export function parseStorage(storage?: string | number): number {
  if (storage === undefined || storage === null || storage === "") return 0;
  if (typeof storage === "number") return storage;
  if (typeof storage === "string") {
    if (storage.endsWith("Gi")) {
      const val = parseFloat(storage.replace("Gi", ""));
      return isNaN(val) ? 0 : val * 1024;
    } else if (storage.endsWith("G")) {
      const val = parseFloat(storage.replace("G", ""));
      return isNaN(val) ? 0 : val * 1024;
    } else if (storage.endsWith("Mi")) {
      const val = parseFloat(storage.replace("Mi", ""));
      return isNaN(val) ? 0 : val;
    } else if (storage.endsWith("M")) {
      const val = parseFloat(storage.replace("M", ""));
      return isNaN(val) ? 0 : val;
    } else {
      const val = parseFloat(storage);
      return isNaN(val) ? 0 : val;
    }
  }
  return 0;
}
