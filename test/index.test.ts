import Botmock, { URL } from "../src";

describe("setup", () => {
  test("creates instance of class when called with new", () => {
    expect(new Botmock({ token: "" })).toBeInstanceOf(Botmock);
  });
  test("throws if not given token", () => {
    expect(() => {
      // @ts-ignore
      const client = new Botmock();
    }).toThrow();
  });
  test("has static url", () => {
    expect(Botmock.URL).toBe(URL);
  });
});

describe("methods", () => {
  test.todo("get project");
  test.todo("get team");
  test.todo("get board");
  test.todo("get intents");
  test.todo("get variables");
  test.todo("get entities");
});

describe.skip("error handling", () => {});
