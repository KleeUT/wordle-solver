import isExists from "date-fns/isExists";
const nyTimeWordleUrl = (date: { day: string; month: string; year: string }) =>
  `https://www.nytimes.com/svc/wordle/v2/${date.year}-${date.month.padStart(
    2,
    "0"
  )}-${date.day.padStart(2, "0")}.json`;

const dateRequiredResponse = () =>
  new Response("date parameter required", {
    status: 400,
  });
const dateIsInvalidResponse = () =>
  new Response("date parameter is invalid", {
    status: 400,
  });

export async function proxyAPI({
  request,
}: {
  request: Request;
}): Promise<Response> {
  if (!request.url.includes("?")) {
    return dateRequiredResponse();
  }

  const queryParams = new URLSearchParams(
    request.url.substring(request.url.indexOf("?") + 1)
  );
  const dateParam = queryParams.get("date");
  if (!dateParam) {
    return dateRequiredResponse();
  }
  const [year, month, day] = dateParam.split("-");

  if (!isExists(Number(year), Number(month), Number(day))) {
    return dateIsInvalidResponse();
  }
  const res = await fetch(
    nyTimeWordleUrl({
      year,
      month,
      day,
    })
  );
  if (!res.ok) {
    return new Response(res.body, { status: res.status });
  }
  return res;
}
