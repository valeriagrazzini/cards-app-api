import { Card } from '../models/card';
import { UserCardToDonate, UserCardToDonateCreateInput, UserCardToDonateFilterInput, UserCardToDonateUpdateInput } from '../models/userCardToDonate';
export declare class UserCardToDonateResolver {
    private baseModelService;
    userCardToDonate(id: number): Promise<UserCardToDonate | undefined>;
    userCardToDonates(data?: UserCardToDonateFilterInput): Promise<UserCardToDonate[]>;
    createUserCardToDonate(data: UserCardToDonateCreateInput): Promise<UserCardToDonate>;
    updateUserCardToDonate(data: UserCardToDonateUpdateInput): Promise<Card>;
    deleteUserCardToDonate(id: number): Promise<boolean>;
    card(userCardToDonate: UserCardToDonate): Promise<Card>;
}
