import { UserRole } from '@/auth/role';
import { UserI } from '@/auth/user.interface';
import { UserCardTradeProposal } from './userCardTradeProposal';
import { CardTradeRequest } from './cardTradeRequest';
import { BaseEntity } from './_baseEntity';
import { BaseUpdateInput, BaseFilterInput } from './_baseInputTypes';
import { UserCardToDonate } from './userCardToDonate';
export declare class User extends BaseEntity implements UserI {
    userName: string;
    email?: string;
    facebookId?: string;
    profilePictureUrl?: string;
    password?: string;
    roles?: UserRole[];
    rating: number;
    points: number;
    isBanned: boolean;
    isDeleted: boolean;
    deletedAt?: Date;
    tradeProposals: Promise<UserCardTradeProposal[]>;
    tradeRequests: Promise<CardTradeRequest[]>;
    cardsToDonate: Promise<UserCardToDonate[]>;
}
export declare class UserCreateInput {
    userName: string;
    email?: string;
    facebookId?: string;
    profilePictureUrl?: string;
    password?: string;
}
export declare class UserUpdateInput extends BaseUpdateInput {
    userName?: string;
    email?: string;
    facebookId?: string;
    profilePictureUrl?: string;
    roles?: UserRole[];
    rating: number;
    points: number;
    isBanned?: boolean;
    isDeleted?: boolean;
    deletedAt?: Date;
}
export declare class UserFilterInput extends BaseFilterInput {
    userName?: string;
    email?: string;
    facebookId?: string;
    isBanned?: boolean;
    isDeleted?: boolean;
}
