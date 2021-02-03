import { User, UserFilterInput, UserCreateInput, UserUpdateInput } from '../models/user';
export declare class UserService {
    findOne(id: number): Promise<User | undefined>;
    findAll(data?: UserFilterInput): Promise<User[]>;
    create(data: UserCreateInput): Promise<User>;
    update(data: UserUpdateInput): Promise<User>;
    delete(id: number): Promise<boolean>;
}
