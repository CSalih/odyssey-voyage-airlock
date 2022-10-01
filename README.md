# Odyssey Voyage II - Server (Airlock)

Welcome to the companion app of Odyssey's Voyage II: Federating the Monolith! This is the `server` backend of the Airlock app. You can [find the course lessons and instructions on Odyssey](http://odyssey.apollographql.com/voyage-part2), Apollo's learning platform.

You can [preview the completed demo app here](https://odyssey-airlock.netlify.app/).

## How to use this repo

The course will walk you through step by step how to turn this monolithic graph into a federated graph. This codebase is the starting point of your journey!

To get started:

1. Run `yarn`
2. Run `yarn start`
3. Run `yarn db:init`.

This will start the GraphQL API server on [http://localhost:4000](http://localhost:4000) and
all the services as well the subgraph's.

| Service                   | Port
|---------------------------| ---
| airlock-client            | 3000
| airlock-router            | 4000
| airlock-monolith          | 4001
| airlock-subgraph-accounts | 4002
| airlock-subgraph-listings | 4003
| airlock-subgraph-bookings | 4004
| airlock-subgraph-review   | 4005
| airlock-subgraph-payments | 4006
| airlock-service-listings  | 4010
| airlock-service-accounts  | 4011

> Note: The [Apollo Router](https://www.apollographql.com/docs/router) is not included. Get the binary and put it into
> `airlock-router/router`.

### Resetting the databases

After playing around with the data, you may want to reset to its initial state.
To do this, run `yarn db:reset`.

## Getting Help

For any issues or problems concerning the course content, please [refer to the Odyssey topic in our community forums](https://community.apollographql.com/tags/c/help/6/odyssey).