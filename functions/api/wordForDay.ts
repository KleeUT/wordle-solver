import { proxyAPI } from "../../server";
export const onRequestGet: PagesFunction = async ({
  request,
}: {
  request: Request;
}) => {
  return await proxyAPI({ request });
};
