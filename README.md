### PraxBot
is a [Discord.js](https://github.com/hydrabolt/discord.js) bot written for the [Praxus Community](http://www.praxusgroup.com). It runs as and interacts directly with a [loopback](https://loopback.io/) app, which serves to simultaniously provide a REST API to a [angular2](https://angular.io/) front-end interface reporting on activity metrics.

The reason why we implemented this bot is because it could both help us as a tool in terms of measuring the health of our community as well as track attendance of new recruits.

The eventual goal is to incorporate much of this functionality with the future Praxus Community suite.

#### Praxbot functionality
- Welcome new members into the server.
- Allow users to request a random quote from other members or the STAR WARS movies.
- Synchronize user activity with a mongodb:
  - User changes such as avatars or usernames
  - Daily activity in VOIP channels
  - Daily activity in Chat channels
  - Daily activity in games which Discord can see
- Report metrics on:
  - Member attendance to community comms / forums
  - Game popularity






