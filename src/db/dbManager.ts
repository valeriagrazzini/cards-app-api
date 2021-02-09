import { Connection, createConnection, getConnection } from 'typeorm'
import { join } from 'path'
const ormConfig = require('../../ormconfig.json')

const entitiesDir = join(__dirname + '/src/models/*.ts').replace('/src/db', '')

export class DbManager {
  static async createConnection(): Promise<Connection | undefined> {
    try {
      const connection = await createConnection({
        ...ormConfig,
        entities: [entitiesDir],
      })
      console.log('TYPEORM CONNECTION ESTABLISHED')
      return connection
    } catch (err) {
      console.log(err)
      return undefined
    }
  }

  static async closeConnection(): Promise<boolean> {
    try {
      const connection = getConnection()
      console.log('TYPEORM CONNECTION ESTABLISHED')
      connection.close()
      console.log('TYPEORM CONNECTION CLOSED')
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
