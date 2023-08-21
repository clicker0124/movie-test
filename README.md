# Install movie-test-api

GraphQl API for gastromatic movie test

## Setup with Docker

Docker and docker compose need to be installed. To start the services run

```
docker compose build
docker compose up
```

Test running server by accessing `http://localhost:3000/movies`

Default Data

The server creates an admin user and mock movie data when it starts. This data helps you quickly test and use the API.

username: admin
password: admin
