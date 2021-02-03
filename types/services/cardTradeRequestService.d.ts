import { CardTradeRequest, CardTradeRequestFilterInput, CardTradeRequestCreateInput, CardTradeRequestUpdateInput } from '../models/cardTradeRequest';
export declare class CardTradeRequestService {
    private _requestDurationInMinutes;
    setConfiguration(configuration: {
        cardTradeRequestDurationInMinutes: number;
    }): void;
    findOne(id: number): Promise<CardTradeRequest | undefined>;
    findAll(data?: CardTradeRequestFilterInput): Promise<CardTradeRequest[]>;
    create(data: CardTradeRequestCreateInput): Promise<CardTradeRequest>;
    update(data: CardTradeRequestUpdateInput): Promise<CardTradeRequest>;
    delete(id: number): Promise<boolean>;
}
