# Botmock JS Client
=========

A thin client around the botmock API.

## Installation

  `npm install botmock`


## Getting Started

In order to get started with this client, you'll need to get your access token from https://botmock.com. After you sign in, go to the *Account Settings* page by clicking on your profile picture on the top right. Then click on *API* from the left side menu. Give your token a name, and hit *Create*. Remember to note down your token since it will not be shown after it is generated.


## Usage

```
// Import the botmock js library
const Botmock = require('botmock-js');

// Create a client
const CLIENT = new Botmock({
    "api_token": API_TOKEN,
    "debug": false // this flag is optional.
});
```

In general, the client acts like a thin wrapper around the REST API. You can read about the API here: http://docs.botmock.com/

The client allows easy access to 3 types of resources.

### Teams

```javascript
client.teams(team_id)
```

Where `team_id` is optional. If not given, this will return all of the teams.

Example Response:

```
[
    {
        "id": 38881,
        "name": "First Team",
        "photo": "https://www.gravatar.com/avatar/00f062fb089de61b9a7e8033bc40109a.jpg?s=200&d=identicon",
        "created_at": {
            "date": "2017-01-10 20:45:21.000000",
            "timezone_type": 3,
            "timezone": "UTC"
        }
    },
    {
        "id": 133244,
        "name": "Second team",
        "photo": "https://www.gravatar.com/avatar/1c5a10ff164629b4da3be8ef5f7fe18d.jpg?s=200&d=identicon",
        "created_at": {
            "date": "2017-07-07 19:22:50.000000",
            "timezone_type": 3,
            "timezone": "UTC"
        }
    },
    {
        "id": 183331,
        "name": "Third Team",
        "photo": "https://www.gravatar.com/avatar/7c507a4e30c13b100a7175f494647e83.jpg?s=200&d=identicon",
        "created_at": {
            "date": "2017-08-12 03:38:19.000000",
            "timezone_type": 3,
            "timezone": "UTC"
        }
    }
]
```

### Projects

```javascript
client.projects(team_id, project_id)
```

Where `team_id` is required, and `project_id` is optional. If `project_id` is omitted, it will return all of the projects for the given team.

Example Response:

```
{
    "id": "16f1c520-05c6-11e7-bc31-5554df9b496b",
    "name": "Kindly",
    "created_at": "2017-03-10 19:16:40",
    "updated_at": "2017-09-15 14:15:59",
    "type": "mock",
    "platform": "facebook"
}
```

### Boards

```javascript
client.boards(team_id, project_id, board_id)
```
Where `team_id`, `project_id` are required, and `board_id` is optional. If `board_id` is omitted, it will return all of the boards for the given team and project.

Example Response:

```
{
    "board": {
        "root_messages": [
            "6af54577-593a-436a-866f-11be95c55b64"
        ],
        "messages": [
            {
                "message_id": "6af54577-593a-436a-866f-11be95c55b64",
                "message_type": "user_reply",
                "next_message_ids": [
                    "c728f3be-218f-40d0-bc83-d92bfca96022"
                ],
                "previous_message_ids": [],
                "is_root": true,
                "payload": {
                    "text": "Search Flights"
                }
            },
            {
                "message_id": "c728f3be-218f-40d0-bc83-d92bfca96022",
                "message_type": "text",
                "next_message_ids": [
                    "e18708cb-2dcf-4545-8c14-7f8c39a7f9f0"
                ],
                "previous_message_ids": [
                    "6af54577-593a-436a-866f-11be95c55b64"
                ],
                "is_root": false,
                "payload": {
                    "text": "Sweet! I love finding people the least agonizing flights! Say something like \"non-stop flight on United from SFO to YOW 10/02 to 10/09\""
                }
            },
            ...
        ]
    },
    "created_at": {
        "date": "2017-09-20 23:47:47.000000",
        "timezone_type": 3,
        "timezone": "UTC"
    },
    "updated_at": {
        "date": "2017-09-20 23:47:47.000000",
        "timezone_type": 3,
        "timezone": "UTC"
    }
}
```


## Tests

  `npm test`

## Contributing

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Licensing

We adopt ISC.
