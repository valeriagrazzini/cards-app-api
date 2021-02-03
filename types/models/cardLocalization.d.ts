import { BaseEntity } from './_baseEntity';
import { Card } from './card';
import { BaseFilterInput, BaseUpdateInput, Languages } from './_baseInputTypes';
export declare class CardLocalization extends BaseEntity {
    cardId: number;
    card: Card;
    langIsoCode: Languages;
    name: string;
}
export declare class CardLocalizationCreateInput {
    cardId: number;
    langIsoCode: Languages;
    name: string;
}
export declare class CardLocalizationUpdateInput extends BaseUpdateInput {
    cardId?: number;
    langIsoCode?: Languages;
    name?: string;
}
export declare class CardLocalizationFilterInput extends BaseFilterInput {
    cardId?: number;
    langIsoCode?: Languages;
    name?: string;
}
