# Requirements

tested on MacOS only

* [docker]
* [docker-compose]

# Development

To start service locally
1. copy `.env_example` and name it `.env`
2. fill the required variables and it is ready to start
3. run `docker-compose up` to start
4. service should be working on `localhost:8080`

# Routes

- `/api/sync`

1. on each request runs seeds to reset database
2. logs expected data to be added/deleted/updated
3. syncs data with mixed data
4. returns json string with stats of request (added,deleted,updated)
