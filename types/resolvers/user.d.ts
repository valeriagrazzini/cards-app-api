import { User, UserCreateInput, UserFilterInput, UserUpdateInput } from '../models/user';
import { UserCardTradeProposal } from '../models/userCardTradeProposal';
import { UserCardToDonate } from '../models/userCardToDonate';
export declare class UserResolver {
    private userService;
    user(id: number): Promise<User | undefined>;
    users(data?: UserFilterInput): Promise<User[]>;
    createUser(data: UserCreateInput): Promise<User>;
    updateUser(data: UserUpdateInput): Promise<User>;
    deleteUser(id: number): Promise<boolean>;
    tradeProposals(user: User): Promise<UserCardTradeProposal[]>;
    cardsToDonate(user: User): Promise<UserCardToDonate[]>;
}
