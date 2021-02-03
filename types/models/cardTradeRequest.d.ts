import { UserCardTradeProposal } from './userCardTradeProposal';
import { User } from './user';
import { BaseEntity } from './_baseEntity';
import { BaseFilterInput, BaseUpdateInput } from './_baseInputTypes';
export declare class CardTradeRequest extends BaseEntity {
    performerUserId: number;
    user: Promise<User>;
    cardTradeProposalId: number;
    userCardTradeProposal: Promise<UserCardTradeProposal>;
    expiresAt: Date;
    isExpired: boolean;
    isClosedByUser: boolean;
    isTraded: boolean;
    rating: number;
    checkIfIsExpired(): void;
}
export declare class CardTradeRequestCreateInput {
    performerUserId: number;
    cardTradeProposalId: number;
}
export declare class CardTradeRequestUpdateInput extends BaseUpdateInput {
    isClosedByUser?: boolean;
    isTraded?: boolean;
    rating?: number;
}
export declare class CardTradeRequestFilterInput extends BaseFilterInput {
    performerUserId?: number;
    cardTradeProposalId?: number;
    isExpired?: boolean;
    isClosedByUser?: boolean;
    isTraded?: boolean;
}
