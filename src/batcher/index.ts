import { Botmock } from "../";
import { EventEmitter } from "events";
import { ClientConfig } from "../";

interface Config {
  clientConfig: ClientConfig;
  projectConfig: {
    teamId: string;
    projectId: string;
    boardId?: string;
  };
}

export type JSONResponse = { [assetName: string]: any; };

export type ResourceMap = Map<string, string>;

export default class extends EventEmitter {
  private readonly client: Botmock;
  private readonly teamId: string;
  private readonly boardId: string;
  private readonly projectId: string;
  private readonly resourceMethodMap: ResourceMap = new Map([
    ["project", "getProject"],
    ["board", "getBoard"],
    ["intents", "getIntents"],
    ["entities", "getEntities"],
    ["variables", "getVariables"],
  ]);
  /**
   * Creates new instance of the batcher
   * @param config config containing botmock project credentials
   */
  constructor(config: Config) {
    super();
    const { teamId, boardId, projectId } = config.projectConfig;
    this.teamId = teamId;
    this.boardId = boardId;
    this.projectId = projectId;
    this.client = new Botmock({
      ...config.clientConfig,
    });
    this.client.on("error", (err: Error) => {
      throw err;
    });
  }
  /**
   * Fetches an array of botmock project resources using the fetcher
   * @param resourceNames string[]
   * @returns Promise<null | { data: JSONResponse }>
   */
  public async batchRequest(resourceNames: string[]): Promise<null | { data: JSONResponse; }> {
    try {
      const { teamId, projectId, boardId } = this;
      const data = await Promise.all(resourceNames.map(async resourceName => {
        const method = this.resourceMethodMap.get(resourceName);
        const argument: Config["projectConfig"] = { projectId, teamId };
        if (resourceName === "board") {
          argument.boardId = boardId;
        }
        return {
          name: resourceName,
          data: await this.client[method](argument),
        };
      }));
      return {
        data: data.reduce((acc, resource) => ({ ...acc, [resource.name]: resource.data }), {})
      };
    } catch (err) {
      this.emit("error", err);
      return null;
    }
  }
}
