# write-apollo
POC GraphQL Yoga server, Prisma-cloud based api/database. Used with write-react app. Uses JWT based auth.

# Prisma-Cloud setup
 - Install Prisma CLI (prisma package)
 - Set GraphQLServer secret and endpoint (found in your Prisma Cloud account) in 
   - src/index.js
   - database/prisma.yml
 > prisma deploy
 
 > prisma generate (already hooks in prisma deploy)
 
 Run the server:
 > node src/index.js

# Run app
https://github.com/Ocro/write-react
