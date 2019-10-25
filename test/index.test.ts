import "dotenv/config";
import { Botmock, Batcher } from "../src";
import { URL } from "../src/fetcher";

describe("batcher", () => {
  test("creates instance of class when called with new", () => {
    expect(new Batcher({ token: "", projectId: "", boardId: "", teamId: "" })).toBeInstanceOf(Batcher);
  });
  test("throws if not given correct object", () => {
    expect.assertions(1);
    expect(() => {
      // @ts-ignore
      new Batcher({});
    }).toThrow();
  });
  test.todo("fetches all required resources");
});

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
  const [projectId, teamId, boardId] = [
    process.env.BOTMOCK_PROJECT_ID,
    process.env.BOTMOCK_TEAM_ID,
    process.env.BOTMOCK_BOARD_ID
  ];
  beforeEach(() => {
    client = new Botmock({ token: process.env.BOTMOCK_TOKEN });
  });
  test("get project", async () => {
    const properties = ["id", "name", "platform", "type", "created_at", "updated_at"];
    const project = await client.getProject({ teamId, projectId });
    expect.assertions(properties.length);
    for (const property of properties) {
      expect(project).toHaveProperty(property);
    }
  });
  test("get team", async () => {
    const team = await client.getTeam(teamId);
    expect(team.id).not.toBeUndefined();
  });
  test("get board", async () => {
    const board = await client.getBoard({ projectId, teamId, boardId });
    expect(board).toHaveProperty("board");
    expect(board.board.messages instanceof Array).toBeTruthy();
  });
  test("get intents", async () => {
    const intents = await client.getIntents({ projectId, teamId });
    expect(intents instanceof Array).toBeTruthy();
  });
  test("get variables", async () => {
    const variables = await client.getVariables({ projectId, teamId });
    expect(variables instanceof Array).toBeTruthy();
  });
  test("get entities", async () => {
    const entities = await client.getEntities({ projectId, teamId });
    expect(entities instanceof Array).toBeTruthy();
  });
});

describe.skip("error handling", () => {});
