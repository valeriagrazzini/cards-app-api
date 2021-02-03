import { Card, CardFilterInput, CardCreateInput, CardUpdateInput } from '@/models/card'
import Container, { Service } from 'typedi'
import { BaseModelService } from './baseModelService'

@Service()
export class CardService {
  private _picturePath!: string
  private modelName: 'Card'

  public setConfiguration(configuration: { cardPicturesPath: string }): void {
    this._picturePath = configuration.cardPicturesPath
  }

  async findOne(id: number): Promise<Card | undefined> {
    const card = await Container.get(BaseModelService).findOne<Card>(this.modelName, id)
    return card
  }

  async findAll(data?: CardFilterInput): Promise<Card[]> {
    const cards = await Container.get(BaseModelService).findAll<Card>(this.modelName, data)
    return cards
  }

  async create(data: CardCreateInput): Promise<Card> {
    const pictureUrl = this._picturePath + '/' + data.pictureName
    const card = await Container.get(BaseModelService).create<Card>(this.modelName, { ...data, pictureUrl })
    return card
  }

  async update(data: CardUpdateInput): Promise<Card> {
    let pictureUrl = undefined
    if (data.pictureName) {
      pictureUrl = this._picturePath + '/' + data.pictureName
    }

    data.id = +data.id
    const card = await Container.get(BaseModelService).create<Card>(this.modelName, { ...data, pictureUrl })
    return card
  }

  async delete(id: number): Promise<boolean> {
    const card = await Container.get(BaseModelService).delete<Card>(this.modelName, id)
    return card
  }
}
