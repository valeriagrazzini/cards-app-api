import { UserPaginatedResult } from '../models/user'
import { DbManager } from '../db/dbManager'
import { UserService } from '../services/userService'

beforeAll(async () => {
  // TYPEORM CONNECTION
  await DbManager.createConnection()
})
afterAll(async () => {
  await DbManager.closeConnection()
})

describe('userService => findAllPaginated', () => {
  it('userService => findAllPaginated', async () => {
    const result = await new UserService().findAllPaginated(0, 30)
    expect(result instanceof UserPaginatedResult)
  })
})
