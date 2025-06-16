// Utility to format CPU (e.g., 500m -> 0.5 vCPU, 50 -> 0.05 vCPU, 2 -> 2 vCPU)
export function formatCpu(cpu?: string | number): string {
  if (cpu === undefined || cpu === null || cpu === "") return "0 vCPU";

  const toVcpu = (val: number): string => `${(val / 1000).toFixed(2)} vCPU`;

  if (typeof cpu === "number") {
    return toVcpu(cpu);
  }

  if (typeof cpu === "string") {
    if (cpu.endsWith("m")) {
      const val = parseFloat(cpu.replace("m", ""));
      if (!isNaN(val)) return toVcpu(val);
      return cpu;
    }

    const val = parseFloat(cpu);
    if (!isNaN(val)) return toVcpu(val);
    return cpu;
  }

  return String(cpu);
}

// Utility to format memory (e.g., 1024Mi -> 1 GiB, 512Mi -> 0.5 GiB, 2Gi -> 2 GiB, 256 -> 256 MiB)
export function formatMemory(memory?: string | number): string {
  if (memory === undefined || memory === null || memory === "") return "0 MiB";

  const toGiB = (val: number): string => `${(val / 1024).toFixed(2)} GiB`;

  if (typeof memory === "number") {
    return memory >= 1024 ? toGiB(memory) : `${memory} MiB`;
  }

  if (typeof memory === "string") {
    if (memory.endsWith("Mi")) {
      const val = parseFloat(memory.replace("Mi", ""));
      return isNaN(val) ? memory : toGiB(val);
    }

    if (memory.endsWith("Gi")) {
      const val = parseFloat(memory.replace("Gi", ""));
      return isNaN(val) ? memory : `${val} GiB`;
    }

    const val = parseFloat(memory);
    if (!isNaN(val)) {
      return val >= 1024 ? toGiB(val) : `${val} MiB`;
    }

    return memory;
  }

  return String(memory);
}
