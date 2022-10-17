import { proxyAPI } from "../../server";
export const onRequestGet: PagesFunction = async ({ request }) => {
  // return new Response(
  //   JSON.stringify({
  //     id: 474,
  //     solution: "marsh",
  //     print_date: "2022-10-05",
  //     days_since_launch: 473,
  //   }),
  //   { headers: { "content-type": "application/json" } }
  // );
  return await proxyAPI({ request });
};
