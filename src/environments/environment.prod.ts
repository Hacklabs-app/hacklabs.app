interface NodeProcess {
  env: Record<string, string | undefined>;
}

// Polyfill process for the browser environment
if (typeof window !== 'undefined' && !(window as unknown as Record<string, unknown>)['process']) {
  (window as unknown as Record<string, unknown>)['process'] = { env: {} } as NodeProcess;
}

export const environment = {
  production: true
};
