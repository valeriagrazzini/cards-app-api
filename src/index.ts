/* eslint-disable @typescript-eslint/no-var-requires */

import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'

import authChecker from './auth/authChecker'
import { CardResolver } from './api/card'
import { SetResolver } from './api/set'
import { SetLocalizationResolver } from './api/setLocalization'
import Container from 'typedi'
import { CardService } from './services/cardService'
import { CardLocalizationResolver } from './api/cardLocalization'
import { UserResolver } from './api/user'
import { UserCardTradeProposalResolver } from './api/userCardTradeProposal'
import { UserCardToDonateResolver } from './api/userCardToDonate'
import { SpinRequestResolver } from './api/spinRequest'
import jwt from 'jsonwebtoken'
import { DbManager } from './db/dbManager'
require('dotenv').config()

const configuration = require('../config.json')

async function start(): Promise<void> {
  // TYPEORM CONNECTION
  await DbManager.createConnection()

  // SET CONFIGURATIONS ..
  Container.get(CardService).setConfiguration(configuration)

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
    ],
    authChecker,
    container: Container,
    //authMode: "null",
  })

  // APOLLO SERVER CREATION
  const server = new ApolloServer({
    introspection: true,
    playground: true,
    schema,
    context: ({ req }): any => {
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
  const port = process.env.PORT ? process.env.PORT : 5000
  await server.listen(port)
  console.log(`GRAPHQL SERVER STARTED -> http://localhost:${port}/graphql`)
}
start()
