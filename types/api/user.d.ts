import { User, UserCreateInput, UserFilterInput, UserPaginatedResult, UserUpdateInput } from '../models/user';
import { UserCardTradeProposal } from '../models/userCardTradeProposal';
import { UserCardToDonate } from '../models/userCardToDonate';
export declare class UserResolver {
    private userService;
    user(id: number): Promise<User | undefined>;
    users(filters?: UserFilterInput): Promise<User[]>;
    usersPaginated(offset: number, take: number, filters?: UserFilterInput): Promise<UserPaginatedResult>;
    createUser(data: UserCreateInput): Promise<User>;
    updateUser(data: UserUpdateInput): Promise<User>;
    deleteUser(id: number): Promise<boolean>;
    tradeProposals(user: User): Promise<UserCardTradeProposal[]>;
    cardsToDonate(user: User): Promise<UserCardToDonate[]>;
}
