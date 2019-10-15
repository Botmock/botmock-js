import "dotenv/config";
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
  let client: Botmock;
  beforeEach(() => {
    client = new Botmock({ token: process.env.BOTMOCK_TOKEN });
  });
  test("get project", async () => {
    const project = await client.getProject({
      teamId: process.env.BOTMOCK_TEAM_ID,
      projectId: process.env.BOTMOCK_PROJECT_ID
    });
    const properties = ["id", "name", "platform", "type", "created_at", "updated_at"];
    for (const property of properties) {
      expect(project).toHaveProperty(property);
    }
  });
  test.todo("get team");
  test.todo("get board");
  test.todo("get intents");
  test.todo("get variables");
  test.todo("get entities");
});

describe.skip("error handling", () => {});
