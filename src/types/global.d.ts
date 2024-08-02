declare namespace Menu {
  interface MenuOptions {
    path: string;
    name: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    meta: MetaProps;
    children?: MenuOptions[];
  }
  interface MetaProps {
    title: string;
    activeMenu?: string;
    isKeepAlive: boolean;
    icon?: string;
  }
  interface TabsMenuProps {
    icon?: string;
    title: string;
    path: string;
    name: string;
    isKeepAlive: boolean;
  }
}

declare interface ViteEnv {
  VITE_USER_NODE_ENV: "development" | "production" | "test";
  VITE_ROUTER_MODE: "hash" | "history";
  VITE_DROP_CONSOLE: boolean;
  VITE_DEVTOOLS: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_API_URL: string;
  VITE_PROXY: [string, string][];
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}

declare type Recordable<T = any> = Record<string, T>;

interface FormData {
  entries(): Iterator<[USVString, USVString | Blob]>;
}
