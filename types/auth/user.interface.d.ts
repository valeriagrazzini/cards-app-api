import { UserRole } from './role';
export interface UserI {
    id: number;
    userName: string;
    roles?: UserRole[];
}
