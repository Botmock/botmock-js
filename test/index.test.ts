import Botmock from "../src";

describe("setup", () => {
  test("creates instance of class when called with new", () => {
    expect(new Botmock({ token: "" })).toBeInstanceOf(Botmock);
  });
  test.todo("throws if not given token");
  test.todo("has static url");
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
