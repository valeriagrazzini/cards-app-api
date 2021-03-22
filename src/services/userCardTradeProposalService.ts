import {
  UserCardTradeProposal,
  UserCardTradeProposalFilterInput,
  UserCardTradeProposalCreateInput,
  UserCardTradeProposalUpdateInput,
} from '../models/userCardTradeProposal'
import Container, { Service } from 'typedi'
import { getConnection } from 'typeorm'
import { BaseModelService } from './baseModelService'
import { CardTradeOffer } from '@/models/cardTradeOffer'
import { CardTradeRequest } from '@/models/cardTradeRequest'

@Service()
export class UserCardTradeProposalService {
  private modelName = 'UserCardTradeProposal'

  async findOne(id: number): Promise<UserCardTradeProposal | undefined> {
    const proposal = await Container.get(BaseModelService).findOne<UserCardTradeProposal>(this.modelName, id)
    return proposal
  }

  async findAll(filters?: UserCardTradeProposalFilterInput): Promise<UserCardTradeProposal[]> {
    const result = await Container.get(BaseModelService).findAll<UserCardTradeProposal>(this.modelName, filters)
    return result
  }

  async create(data: UserCardTradeProposalCreateInput): Promise<UserCardTradeProposal> {
    const result = await getConnection().transaction('REPEATABLE READ', async (entityManager) => {
      let proposal = {
        userId: data.userId,
      } as UserCardTradeProposal

      // CREATE THE PROPOSAL
      proposal = await entityManager.getRepository<UserCardTradeProposal>(this.modelName).save(proposal)

      // CREATE THE CARDS OFFERED
      let repository = entityManager.getRepository<CardTradeOffer>('CardTradeOffer')
      for (let i = 0; i < data.cardsOffered.length; i++) {
        await repository.save({
          ...data.cardsOffered[i],
          cardTradeProposalId: proposal.id,
        })
      }

      // CREATE THE CARDS REQUESTED
      repository = entityManager.getRepository<CardTradeRequest>('CardTradeRequest')
      for (let i = 0; i < data.cardsRequested.length; i++) {
        await repository.save({
          ...data.cardsRequested[i],
          cardTradeProposalId: proposal.id,
        })
      }
      return proposal
    })
    return result
  }

  async update(data: UserCardTradeProposalUpdateInput): Promise<UserCardTradeProposal> {
    if (data.id) {
      data.id = +data.id
    }

    const result = await getConnection().transaction('REPEATABLE READ', async (entityManager) => {
      const proposalRepository = entityManager.getRepository<UserCardTradeProposal>(this.modelName)
      let proposal = await proposalRepository.findOne(data.id)

      if (!proposal) {
        console.log('PROPOSAL NOT FOUND!', data.id)
        throw new Error('PROPOSAL NOT FOUND!')
      }
      const originalCardsOffered = await proposal.cardsOffered
      const originalCardsRequested = await proposal.cardsRequested

      // UPDATE THE PROPOSAL
      if (data.userId && proposal.userId !== data.userId) {
        proposal.userId = data.userId
        proposal = await proposalRepository.save(proposal)
      }

      // UPDATE THE CARDS OFFERED
      if (data.cardsOffered) {
        const repository = entityManager.getRepository<CardTradeOffer>('CardTradeOffer')

        for (let i = 0; i < data.cardsOffered.length; i++) {
          const id = data.cardsOffered[i].id
          const card = {
            id: id ? +id : undefined,
            cardTradeProposalId: proposal.id,
            cardId: data.cardsOffered[i].cardId,
            quantity: data.cardsOffered[i].quantity,
          } as CardTradeOffer

          await repository.save(card)
        }

        const cardsToRemove = originalCardsOffered
          .map((x) => x.id)
          .filter((y) => data.cardsOffered && !data.cardsOffered.map((z) => (z.id ? +z.id : undefined)).includes(y))

        if (cardsToRemove.length > 0) {
          for (let i = 0; i < cardsToRemove.length; i++) {
            await repository.delete({ id: cardsToRemove[i] })
          }
        }
      }

      // UPDATE THE CARDS REQUESTED
      if (data.cardsRequested) {
        const repository = entityManager.getRepository<CardTradeRequest>('CardTradeRequest')

        for (let i = 0; i < data.cardsRequested.length; i++) {
          const id = data.cardsRequested[i].id
          const card = {
            id: id ? +id : undefined,
            cardTradeProposalId: proposal.id,
            cardId: data.cardsRequested[i].cardId,
            quantity: data.cardsRequested[i].quantity,
          } as CardTradeRequest

          await repository.save(card)
        }

        const cardsToRemove = originalCardsRequested
          .map((x) => x.id)
          .filter((y) => data.cardsRequested && !data.cardsRequested.map((z) => (z.id ? +z.id : undefined)).includes(y))

        if (cardsToRemove.length > 0) {
          for (let i = 0; i < cardsToRemove.length; i++) {
            await repository.delete({ id: cardsToRemove[i] })
          }
        }
      }
      return proposal
    })
    return result
  }

  async delete(id: number): Promise<boolean> {
    const result = await getConnection().transaction('REPEATABLE READ', async (entityManager) => {
      const proposalRepository = entityManager.getRepository<UserCardTradeProposal>(this.modelName)
      const proposal = await proposalRepository.findOne(id)

      if (!proposal) {
        console.log('PROPOSAL NOT FOUND!', id)
        throw new Error('PROPOSAL NOT FOUND!')
      }

      // DELETE THE CARDS OFFERED
      await entityManager.getRepository<CardTradeOffer>('CardTradeOffer').delete({ cardTradeProposalId: proposal.id })

      // CREATE THE CARDS REQUESTED
      await entityManager
        .getRepository<CardTradeRequest>('CardTradeRequest')
        .delete({ cardTradeProposalId: proposal.id })

      // DELETE THE PROPOSAL
      await proposalRepository.delete(id)
      return true
    })
    return result
  }
}
