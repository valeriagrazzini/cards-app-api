/* eslint-disable @typescript-eslint/no-var-requires */

import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { createConnection } from 'typeorm'
import { join } from 'path'
import authChecker from './auth/authChecker'
import { CardResolver } from './resolvers/card'
import { SetResolver } from './resolvers/set'
import { SetLocalizationResolver } from './resolvers/setLocalization'
import Container from 'typedi'
import { CardService } from './services/cardService'
import { CardLocalizationResolver } from './resolvers/cardLocalization'
import { UserResolver } from './resolvers/user'
import { UserCardTradeProposalResolver } from './resolvers/userCardTradeProposal'
import { CardTradeRequestResolver } from './resolvers/cardTradeRequest'
import { CardTradeRequestService } from './services/cardTradeRequestService'
import { UserCardToDonateResolver } from './resolvers/userCardToDonate'
import jwt from 'jsonwebtoken'
require('dotenv').config()

const ormConfig = require('../ormconfig.json')
const configuration = require('../config.json')

async function start(): Promise<void> {
  // TYPEORM CONNECTION
  await createConnection({
    ...ormConfig,
    entities: [join(__dirname + '/models/*.ts')],
  })
    .then(() => {
      console.log('TYPEORM CONNECTION ESTABLISHED')
    })
    .catch((error) => console.log(error))

  // SET CONFIGURATIONS ..
  Container.get(CardService).setConfiguration(configuration)
  Container.get(CardTradeRequestService).setConfiguration(configuration)

  // GRAPHQL SCHEMA CREATION
  const schema = await buildSchema({
    resolvers: [
      SetResolver,
      CardResolver,
      SetLocalizationResolver,
      CardLocalizationResolver,
      UserResolver,
      UserCardTradeProposalResolver,
      CardTradeRequestResolver,
      UserCardToDonateResolver,
    ],
    authChecker,
    container: Container,
    //authMode: "null",
  })

  // APOLLO SERVER CREATION
  const server = new ApolloServer({
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
  const port = 4035
  await server.listen(port)
  console.log(`GRAPHQL SERVER STARTED -> http://localhost:${port}/graphql`)
}
start()
