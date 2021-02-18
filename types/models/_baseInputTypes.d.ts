export declare class BaseUpdateInput {
    id?: number;
}
export declare class BaseFilterInput {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class BasePaginatedResult {
    offset: number;
    total: number;
}
export declare enum Languages {
    Italiano = "IT",
    Portuguese = "PT",
    English = "EN"
}
