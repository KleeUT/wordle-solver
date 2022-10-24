import { describe, expect, it } from "vitest";
import { proxyAPI } from "./wordForDay";

describe("word for day handler", () => {
  it("should 400 when no query parameters", async () => {
    const request: Partial<Request> = {
      url: "http://base.url/path",
    };
    const response = await proxyAPI({ request: request as Request });
    expect(response?.status).toEqual(400);
  });
  it("should 400 when no date query parameter", async () => {
    const request: Partial<Request> = {
      url: "http://base.url/path?someQuery=notthedate",
    };
    const response = await proxyAPI({ request: request as Request });
    expect(response?.status).toEqual(400);
  });
  it("should 400 when date query parameter is not valid date", async () => {
    const request: Partial<Request> = {
      url: "http://base.url/path?date=2022-10-75",
    };
    const response = await proxyAPI({ request: request as Request });
    expect(response?.status).toEqual(400);
  });
});
