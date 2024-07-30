const mode = import.meta.env.VITE_ROUTER_MODE;

export function getUrlWithParams() {
  const url = {
    hash: location.hash.substring(1),
    history: location.pathname + location.search
  };
  return url[mode];
}
