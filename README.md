# write-apollo
POC GraphQL Yoga server, Prisma-cloud based api/database. Used with write-react app. Uses JWT based auth.

# Prisma-Cloud setup
 - Install Prisma CLI (prisma package)
 Set GraphQLServer secret and endpoint in src/index.js
 and database/prisma.yml
 > prisma deploy
 > prisma generate
 > node src/index.js

# Run app
https://github.com/Ocro/write-react
