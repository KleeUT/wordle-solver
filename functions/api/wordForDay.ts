import { proxyAPI } from "../../server";
export function onRequestGet({ request }: { request: Request }) {
  return proxyAPI({ request });
}
