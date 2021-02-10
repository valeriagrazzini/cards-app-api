import { Connection } from 'typeorm';
export declare class DbManager {
    static createConnection(): Promise<Connection | undefined>;
    static closeConnection(): Promise<boolean>;
}
