import { Card, CardCreateInput, CardFilterInput, CardUpdateInput } from '../models/card';
export declare class CardResolver {
    private cardService;
    card(id: number): Promise<Card | undefined>;
    cards(data?: CardFilterInput): Promise<Card[]>;
    createCard(data: CardCreateInput): Promise<Card>;
    updateCard(data: CardUpdateInput): Promise<Card>;
    deleteCard(id: number): Promise<boolean>;
}
