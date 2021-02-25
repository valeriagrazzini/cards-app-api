import { BaseOrderInput } from '@/models/_baseInputTypes'
import { Service } from 'typedi'
import { getRepository } from 'typeorm'

@Service()
export class BaseModelService {
  async findOne<TModel>(modelName: string, data: any): Promise<TModel | undefined> {
    return await getRepository<TModel>(modelName).findOne(data)
  }

  async findAll<TModel>(modelName: string, filters?: any, cache?: boolean): Promise<TModel[]> {
    if (cache === undefined) {
      cache = false
    }
    if (!filters) {
      return await getRepository<TModel>(modelName).find({ cache })
    }
    return await getRepository<TModel>(modelName).find({ where: { ...filters } })
  }

  async findAllPaginated<TModel>(
    modelName: string,
    offset: number,
    take: number,
    filters?: any,
    order?: BaseOrderInput
  ): Promise<any> {
    const [rows, total] = await getRepository<TModel>(modelName)
      .createQueryBuilder('model')
      .where({ ...filters })
      .take(take)
      .skip(offset * take)
      .orderBy(order ? JSON.parse(JSON.stringify(order)) : undefined)
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
    const repository = getRepository<TModel>(modelName)
    const entity = await repository.findOne(data.id)

    if (!entity) {
      console.log('Entity not found!', data.id)
      throw new Error('Entity not found!')
    }
    this._setModifiedValues(entity, data) // SET MODIFIED VALUES FROM INPUT

    return await repository.save(entity)
  }

  async delete<TModel>(modelName: string, data: any): Promise<boolean> {
    const result = await getRepository<TModel>(modelName).delete(data)
    if (!result.affected) {
      return false
    }
    return true
  }

  private _setModifiedValues(obj: any, data: any): void {
    const inputKeyValues = Object.entries(obj).map(([key, value]) => ({ key, value }))
    for (let i = 0; i < inputKeyValues.length; i++) {
      const entry = JSON.parse(JSON.stringify(inputKeyValues[i]))
      if (Object(data)[entry.key] !== undefined) {
        Object(obj)[entry.key] = Object(data)[entry.key]
      }
    }
  }
}
