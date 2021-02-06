import { Service } from 'typedi'
import { getRepository } from 'typeorm'

@Service()
export class BaseModelService {
  async findOne<TModel>(modelName: string, data: any): Promise<TModel | undefined> {
    return await getRepository<TModel>(modelName).findOne(data)
  }

  async findAll<TModel>(modelName: string, data?: any): Promise<TModel[]> {
    if (!data) {
      return await getRepository<TModel>(modelName).find()
    }
    return await getRepository<TModel>(modelName).find({ where: { ...data } })
  }

  async create<TModel>(modelName: string, data: any): Promise<TModel> {
    console.log(modelName)
    return await getRepository<TModel>(modelName).save(data)
  }

  async update<TModel>(modelName: string, data: any): Promise<TModel> {
    if (!data.id) {
      throw new Error('Entity id is missing!')
    }
    data.id = +data.id
    return await getRepository<TModel>(modelName).save(data)
  }

  async delete<TModel>(modelName: string, data: any): Promise<boolean> {
    const result = await getRepository<TModel>(modelName).delete(data)
    if (!result.affected) {
      return false
    }
    return true
  }
}
