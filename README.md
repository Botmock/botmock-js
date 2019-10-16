# @botmock/client

> nodejs client for interacting with the botmock api

### Installation

> Note: In order to get started with this client, you'll need to get your access token from https://app.botmock.com. After you sign in, go to the Account Settings page by clicking on your profile picture on the top right. Then click on "Developer API" from the dropdown menu. Give your token a name, check the box, and hit "Create". Remember to note down your token since it will not be shown after it is generated.

```bash
npm i @botmock/client
```

```ts
import Botmock from "@botmock/client";

const client = new Botmock({ token: process.env.BOTMOCK_TOKEN });
```

### API

##### Methods

**`client.getProject(opt): Promise<any>`**

Gets project from a `teamId` and `projectId` within `opt`

```ts
const project = await client.getProject({ teamId, projectId });
```

**`client.getTeam(teamId): Promise<any>`**

Gets team from a `teamId`

```ts
const team = await client.getTeam(teamId);
```

**`client.getBoard(opt): Promise<any>`**

Gets board data from a `teamId`, `projectId` and `boardId`

```ts
const board = await client.getBoard({ teamId, projectId, boardId });
```

**`client.getIntents(opt): Promise<any>`**

Gets all intents from a `teamId` and `projectId`

```ts
const intents = await client.getIntents({ teamId, projectId });
```

**`client.getVariables(opt): Promise<any>`**

Gets all variables from a `teamId` and `projectId`

```ts
const variables = await client.getVariables({ teamId, projectId });
```

**`client.getEntities(opt): Promise<any>`**

Gets all entities from a `teamId` and `projectId`

```ts
const entities = await client.getEntities({ teamId, projectId });
```

#### Error Handling

Events containing errors and also successes can be listened to in the following ways.

```ts
const client = new Botmock({ token: process.env.BOTMOCK_TOKEN });

client.on("error", ({ error, endpoint }: { error: FetchError, endpoint: string }) => {
  console.error(error, endpoint);
});

client.on("success", ({ endpoint, timestamp }: { endpoint: string, timestamp: number }) => {
  console.error(endpoint, timestamp);
});
```
