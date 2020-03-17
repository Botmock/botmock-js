import fetch, { FetchError } from "node-fetch";
import { EventEmitter } from "events";
import { Agent } from "https";

export interface Config {
  token: string;
  agent?: Agent;
  subdomain?: string;
}

interface ProjectOpt {
  teamId: string;
  projectId: string;
}

interface BoardOpt extends ProjectOpt {
  boardId: string;
}

export default class Botmock extends EventEmitter {
  token: string;
  timeout: number = 10_000;
  #url: string;
  #agent: Agent | undefined;
  /**
   * Create a new instance of the client
   */
  constructor(config: Config) {
    super();
    if (typeof config.token !== "string") {
      throw new Error("token must be a string");
    }
    this.token = config.token;
    this.#url = `https://${config.subdomain ?? "app"}.botmock.com/api`;
    if (config.agent instanceof Agent) {
      this.#agent = config.agent;
    }
  }
  /**
   * Fetches given resource using config derived from values given during instantiation
   * @param endpoint string
   * @returns Promise<Response>
   */
  private async fetch(endpoint: string): Promise<JSON | FetchError> {
    const url = `${this.#url}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/json"
    };
    const opt = {
      headers,
      timeout: this.timeout,
      agent: this.#agent,
    };
    const res = await fetch(url, opt);
    if (!res.ok) {
      const error = new FetchError(res.statusText, "error");
      // @ts-ignore
      this.emit("error", { endpoint, error });
      return error;
    }
    // @ts-ignore
    this.emit("success", { endpoint, timestamp: new Date() });
    return await res.json();
  }
  /**
   * Gets project from a teamId and projectId
   * @param opt ProjectOpt
   * @returns Promise<any>
   */
  public async getProject(opt: ProjectOpt): Promise<any> {
    const { teamId, projectId } = opt;
    return await this.fetch(`teams/${teamId}/projects/${projectId}`);
  }
  /**
   * Gets team data from a teamId
   * @param teamId string
   * @returns Promise<any>
   */
  public async getTeam(teamId: string): Promise<any> {
    return await this.fetch(`teams/${teamId}`);
  }
  /**
   * Gets board data from a teamId, projectId and boardId
   * @param opt BoardOpt
   * @returns Promise<any>
   */
  public async getBoard(opt: BoardOpt): Promise<any> {
    const { teamId, projectId, boardId } = opt;
    return await this.fetch(`teams/${teamId}/projects/${projectId}/boards/${boardId}`);
  }
  /**
   * Gets all intents for a project
   * @param opt ProjectOpt
   * @returns Promise<any>
   */
  public async getIntents(opt: ProjectOpt): Promise<any> {
    const { teamId, projectId } = opt;
    return await this.fetch(`teams/${teamId}/projects/${projectId}/intents`);
  }
  /**
   * Gets all variables for a project
   * @param opt ProjectOpt
   * @returns Promise<any>
   */
  public async getVariables(opt: ProjectOpt): Promise<any> {
    const { teamId, projectId } = opt;
    return await this.fetch(`teams/${teamId}/projects/${projectId}/variables`);
  }
  /**
   * Gets all entities for a project
   * @param opt ProjectOpt
   * @returns Promise<any>
   */
  public async getEntities(opt: ProjectOpt): Promise<any> {
    const { teamId, projectId } = opt;
    return await this.fetch(`teams/${teamId}/projects/${projectId}/entities`);
  }
}
