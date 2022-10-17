import { proxyAPI } from "../../server";
export async function onRequestGet({ request }: { request: Request }) {
  return await proxyAPI({ request });
}
