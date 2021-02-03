import { Card, CardFilterInput, CardCreateInput, CardUpdateInput } from '@/models/card';
export declare class CardService {
    private _picturePath;
    private modelName;
    setConfiguration(configuration: {
        cardPicturesPath: string;
    }): void;
    findOne(id: number): Promise<Card | undefined>;
    findAll(data?: CardFilterInput): Promise<Card[]>;
    create(data: CardCreateInput): Promise<Card>;
    update(data: CardUpdateInput): Promise<Card>;
    delete(id: number): Promise<boolean>;
}
