import { BaseEntity } from './_baseEntity';
import { Set } from './set';
import { BaseFilterInput, BaseUpdateInput, Languages } from './_baseInputTypes';
export declare class SetLocalization extends BaseEntity {
    setId: number;
    set: Set;
    langIsoCode: Languages;
    name: string;
}
export declare class SetLocalizationCreateInput {
    setId: number;
    langIsoCode: Languages;
    name: string;
}
export declare class SetLocalizationUpdateInput extends BaseUpdateInput {
    setId?: number;
    langIsoCode?: Languages;
    name?: string;
}
export declare class SetLocalizationFilterInput extends BaseFilterInput {
    setId?: number;
    langIsoCode?: Languages;
    name?: string;
}
