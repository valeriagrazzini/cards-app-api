import { Card } from './card';
import { User } from './user';
import { BaseEntity } from './_baseEntity';
import { BaseFilterInput, BaseUpdateInput } from './_baseInputTypes';
export declare class UserCardToDonate extends BaseEntity {
    userId: number;
    user: User;
    cardId: number;
    card: Promise<Card>;
    quantity: number;
}
export declare class UserCardToDonateCreateInput {
    userId: number;
    cardId: number;
    quantity?: number;
}
export declare class UserCardToDonateUpdateInput extends BaseUpdateInput {
    userId?: number;
    cardId?: number;
    quantity?: number;
}
export declare class UserCardToDonateFilterInput extends BaseFilterInput {
    userId?: number;
    cardId?: number;
}
