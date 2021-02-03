import { BaseEntity } from './_baseEntity';
import { Set } from './set';
import { CardLocalization } from './cardLocalization';
import { BaseFilterInput, BaseUpdateInput } from './_baseInputTypes';
export declare class Card extends BaseEntity {
    name: string;
    pictureUrl?: string;
    setId: number;
    set: Set;
    rating: number;
    isGold: boolean;
    stars: number;
    order: number;
    localizations: CardLocalization[];
}
export declare class CardCreateInput {
    name: string;
    pictureName?: string;
    setId: number;
    rating?: number;
    isGold: boolean;
    stars: number;
    order: number;
}
export declare class CardUpdateInput extends BaseUpdateInput {
    name?: string;
    pictureName?: string;
    setId?: number;
    rating?: number;
    isGold?: boolean;
    stars?: number;
    order?: number;
}
export declare class CardFilterInput extends BaseFilterInput {
    name?: string;
    setId?: number;
    rating?: number;
    isGold?: boolean;
    stars?: number;
}
