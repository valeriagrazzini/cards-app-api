import { Card } from '../models/card';
import { CardLocalization, CardLocalizationCreateInput, CardLocalizationFilterInput, CardLocalizationUpdateInput } from '../models/cardLocalization';
export declare class CardLocalizationResolver {
    private baseModelService;
    cardLocalization(id: number): Promise<CardLocalization | undefined>;
    cardLocalizations(data?: CardLocalizationFilterInput): Promise<CardLocalization[]>;
    createCardLocalization(data: CardLocalizationCreateInput): Promise<CardLocalization>;
    updateCardLocalization(data: CardLocalizationUpdateInput): Promise<Card>;
    deleteCardLocalization(id: number): Promise<boolean>;
}
