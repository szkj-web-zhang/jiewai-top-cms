export function isDevFn(mode: string): boolean {
  return mode === "development";
}

export function isProdFn(mode: string): boolean {
  return mode === "production";
}

export function isTestFn(mode: string): boolean {
  return mode === "test";
}

export function envToObjects(viteEnv: Recordable): ViteEnv {
  const ret: any = {};
  for (const envKey of Object.keys(viteEnv)) {
    let envValue = viteEnv[envKey].replace(/\\n/g, "\n");
    envValue =
      envValue === "true" ? true : envValue === "false" ? false : envValue;
    if (envKey === "VITE_PORT") envValue = Number(envValue);
    if (envKey === "VITE_PROXY") {
      try {
        envValue = JSON.parse(envValue);
      } catch (error) {}
    }
    ret[envKey] = envValue;
  }
  return ret;
}
