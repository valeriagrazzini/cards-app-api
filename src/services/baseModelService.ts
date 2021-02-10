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

  async findAllPaginated<TModel>(modelName: string, offset: number, take: number, filters?: any): Promise<any> {
    const [rows, total] = await getRepository<TModel>(modelName)
      .createQueryBuilder('model')
      .where({ ...filters })
      .take(take)
      .skip(offset * take)
      .getManyAndCount()

    const result = {
      data: rows,
      total,
      offset,
      take,
    }
    return result
  }

  async create<TModel>(modelName: string, data: any): Promise<TModel> {
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
