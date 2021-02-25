/* eslint-disable @typescript-eslint/no-var-requires */

import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'

import authChecker from './auth/authChecker'
import { CardResolver } from './api/card'
import { SetResolver } from './api/set'
import { SetLocalizationResolver } from './api/setLocalization'
import Container from 'typedi'
import { CardLocalizationResolver } from './api/cardLocalization'
import { UserResolver } from './api/user'
import { UserCardTradeProposalResolver } from './api/userCardTradeProposal'
import { UserCardToDonateResolver } from './api/userCardToDonate'
import { SpinRequestResolver } from './api/spinRequest'
import jwt from 'jsonwebtoken'
import { DbManager } from './db/dbManager'
import express from 'express'
import http from 'http'
import { MessageResolver } from './api/message'
import { ChatResolver } from './api/chat'
require('dotenv').config()

async function start(): Promise<void> {
  // TYPEORM CONNECTION
  await DbManager.createConnection()

  // GRAPHQL SCHEMA CREATION
  const schema = await buildSchema({
    resolvers: [
      SetResolver,
      CardResolver,
      SetLocalizationResolver,
      CardLocalizationResolver,
      UserResolver,
      UserCardTradeProposalResolver,
      UserCardToDonateResolver,
      SpinRequestResolver,
      MessageResolver,
      ChatResolver,
    ],
    authChecker,
    container: Container,
    //authMode: "null",
  })

  const app = express()

  // APOLLO SERVER CREATION
  const server = new ApolloServer({
    introspection: true,
    playground: true,
    schema,
    context: ({ req, connection }): any => {
      if (connection) {
        return connection.context
      }
      let token = req.headers.authorization
      if (!token) {
        console.log('info NOT LOGGED IN')
        return {}
      }

      token = token.replace('Bearer ', '')
      const decoded = jwt.verify(token, process.env.SECRET ? process.env.SECRET : '')
      return decoded
    },
  })

  server.applyMiddleware({ app })
  const httpServer = http.createServer(app)
  server.installSubscriptionHandlers(httpServer)

  const port = process.env.PORT ? process.env.PORT : 5000

  httpServer.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`)
  })
}
start()
