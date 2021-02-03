import { Card } from './card';
import { SetLocalization } from './setLocalization';
import { BaseEntity } from './_baseEntity';
import { BaseFilterInput, BaseUpdateInput } from './_baseInputTypes';
export declare class Set extends BaseEntity {
    name: string;
    cards: Promise<Card[]>;
    localizations: Promise<SetLocalization[]>;
}
export declare class SetCreateInput {
    name: string;
}
export declare class SetUpdateInput extends BaseUpdateInput {
    name?: string;
}
export declare class SetFilterInput extends BaseFilterInput {
    name?: string;
}
