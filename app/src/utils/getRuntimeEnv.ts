declare global {
  interface Window {
    env?: Record<string, string>;
  }
}

export function getRuntimeEnv(key: string): string | undefined {
  if (typeof window !== 'undefined' && window.env) {
    return window.env[key];
  }
  return undefined;
}
