import { User } from './user';
import { BaseEntity } from './_baseEntity';
import { BaseFilterInput, BasePaginatedResult, BaseUpdateInput } from './_baseInputTypes';
export declare class SpinRequest extends BaseEntity {
    userId: number;
    user: Promise<User>;
    link: string;
    expiresAt: Date;
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
export declare class SpinRequestPaginatedResult extends BasePaginatedResult {
    data: SpinRequest[];
}
