// Utility to format CPU (e.g., 500m -> 0.5 vCPU, 2 -> 2 vCPU, 10 -> 10 vCPU)
export function formatCpu(cpu?: string | number): string {
  if (cpu === undefined || cpu === null || cpu === "") return "0 vCPU";
  if (typeof cpu === "number") return `${cpu} vCPU`;
  if (typeof cpu === "string") {
    if (cpu.endsWith("m")) {
      const val = parseFloat(cpu.replace("m", ""));
      if (isNaN(val)) return cpu;
      return `${val / 1000} vCPU`;
    }
    const val = parseFloat(cpu);
    if (!isNaN(val)) return `${val} vCPU`;
    return cpu;
  }
  return String(cpu);
}

// Utility to format memory (e.g., 1024Mi -> 1 GiB, 512Mi -> 0.5 GiB, 2Gi -> 2 GiB, 20 -> 20 MiB)
export function formatMemory(memory?: string | number): string {
  if (memory === undefined || memory === null || memory === "") return "0 MiB";
  if (typeof memory === "number") {
    if (memory >= 1024) return `${(memory / 1024).toFixed(2)} GiB`;
    return `${memory} MiB`;
  }
  if (typeof memory === "string") {
    if (memory.endsWith("Mi")) {
      const val = parseFloat(memory.replace("Mi", ""));
      if (isNaN(val)) return memory;
      return `${(val / 1024).toFixed(2)} GiB`;
    }
    if (memory.endsWith("Gi")) {
      const val = parseFloat(memory.replace("Gi", ""));
      if (isNaN(val)) return memory;
      return `${val} GiB`;
    }
    const val = parseFloat(memory);
    if (!isNaN(val)) {
      if (val >= 1024) return `${(val / 1024).toFixed(2)} GiB`;
      return `${val} MiB`;
    }
    return memory;
  }
  return String(memory);
}
