import { Card } from '../models/card';
import { UserCardTradeProposal, UserCardTradeProposalCreateInput, UserCardTradeProposalFilterInput, UserCardTradeProposalUpdateInput } from '../models/userCardTradeProposal';
export declare class UserCardTradeProposalResolver {
    private baseModelService;
    userCardTradeProposal(id: number): Promise<UserCardTradeProposal | undefined>;
    userCardTradeProposals(data?: UserCardTradeProposalFilterInput): Promise<UserCardTradeProposal[]>;
    createUserCardTradeProposal(data: UserCardTradeProposalCreateInput): Promise<UserCardTradeProposal>;
    updateUserCardTradeProposal(data: UserCardTradeProposalUpdateInput): Promise<Card>;
    deleteUserCardTradeProposal(id: number): Promise<boolean>;
    cardsOffered(userCardTradeProposal: UserCardTradeProposal): Promise<Card[]>;
    cardsRequested(userCardTradeProposal: UserCardTradeProposal): Promise<Card[]>;
}
