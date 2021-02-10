import { User, UserFilterInput, UserCreateInput, UserUpdateInput, UserPaginatedResult } from '../models/user';
export declare class UserService {
    findOne(id: number): Promise<User | undefined>;
    findAll(filters?: UserFilterInput): Promise<User[]>;
    findAllPaginated(offset: number, take: number, filters?: UserFilterInput): Promise<UserPaginatedResult>;
    create(data: UserCreateInput): Promise<User>;
    update(data: UserUpdateInput): Promise<User>;
    delete(id: number): Promise<boolean>;
}
