import { CardTradeRequest, CardTradeRequestCreateInput, CardTradeRequestFilterInput, CardTradeRequestUpdateInput } from '../models/cardTradeRequest';
import { User } from '../models/user';
import { UserCardTradeProposal } from '../models/userCardTradeProposal';
export declare class CardTradeRequestResolver {
    private cardTradeRequestService;
    cardTradeRequest(id: number): Promise<CardTradeRequest | undefined>;
    cardTradeRequests(data?: CardTradeRequestFilterInput): Promise<CardTradeRequest[]>;
    createCardTradeRequest(data: CardTradeRequestCreateInput): Promise<CardTradeRequest>;
    updateCardTradeRequest(data: CardTradeRequestUpdateInput): Promise<CardTradeRequest>;
    deleteCardTradeRequest(id: number): Promise<boolean>;
    user(cardTradeRequest: CardTradeRequest): Promise<User>;
    proposal(cardTradeRequest: CardTradeRequest): Promise<UserCardTradeProposal>;
}
