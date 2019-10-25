import fetch, { FetchError } from "node-fetch";
import { EventEmitter } from "events";

interface Config {
  readonly token: string;
}

interface ProjectOpt {
  readonly teamId: string;
  readonly projectId: string;
}

interface BoardOpt extends ProjectOpt {
  readonly boardId: string;
}

export const URL: string = "https://app.botmock.com/api";

export default class Botmock extends EventEmitter {
  static URL: string = URL;
  private readonly token: string;
  private readonly timeout: number = 10_000;
  /**
   * Create a new instance of the client
   */
  constructor(config: Config) {
    super();
    if (typeof config.token !== "string") {
      throw new Error("token must be a string");
    }
    this.token = config.token;
  }
  /**
   * Fetches given resource using config derived from values given during instantiation 
   * @param endpoint string
   * @returns Promise<Response>
   */
  private async fetch(endpoint: string): Promise<JSON | FetchError> {
    const url = `${Botmock.URL}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/json"
    };
    const res = await fetch(url, { headers, timeout: this.timeout });
    if (!res.ok) {
      const error = new FetchError(res.statusText, "error")
      this.emit("error", { endpoint, error });
      return error;
    }
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
