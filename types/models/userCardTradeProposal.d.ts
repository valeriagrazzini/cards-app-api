import { Card } from './card';
import { CardTradeRequest } from './cardTradeRequest';
import { User } from './user';
import { BaseEntity } from './_baseEntity';
import { BaseFilterInput, BaseUpdateInput } from './_baseInputTypes';
export declare class UserCardTradeProposal extends BaseEntity {
    userId: number;
    user: User;
    cardProposalId: number;
    cardProposalQuantity: number;
    cardRequestId: number;
    cardRequestQuantity: number;
    cardProposal: Promise<Card>;
    cardRequest: Promise<Card>;
    tradeRequests: Promise<CardTradeRequest[]>;
}
export declare class UserCardTradeProposalCreateInput {
    userId: number;
    cardProposalId: number;
    cardProposalQuantity?: number;
    cardRequestId: number;
    cardRequestQuantity?: number;
}
export declare class UserCardTradeProposalUpdateInput extends BaseUpdateInput {
    userId?: number;
    cardProposalId?: number;
    cardProposalQuantity?: number;
    cardRequestId?: number;
    cardRequestQuantity?: number;
}
export declare class UserCardTradeProposalFilterInput extends BaseFilterInput {
    userId?: number;
}
