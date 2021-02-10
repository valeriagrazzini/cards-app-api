import { User } from './user';
import { BaseEntity } from './_baseEntity';
import { BaseFilterInput, BaseUpdateInput } from './_baseInputTypes';
export declare class SpinRequest extends BaseEntity {
    userId: number;
    user: Promise<User>;
    link: string;
    expiresAt: Date;
    isExpired: boolean;
    checkIfIsExpired(): void;
}
export declare class SpinRequestCreateInput {
    userId: number;
    link: string;
}
export declare class SpinRequestUpdateInput extends BaseUpdateInput {
}
export declare class SpinRequestFilterInput extends BaseFilterInput {
    userId?: number;
    isExpired?: boolean;
}
