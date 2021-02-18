export declare class BaseModelService {
    findOne<TModel>(modelName: string, data: any): Promise<TModel | undefined>;
    findAll<TModel>(modelName: string, filters?: any, cache?: boolean): Promise<TModel[]>;
    findAllPaginated<TModel>(modelName: string, offset: number, take: number, filters?: any): Promise<any>;
    create<TModel>(modelName: string, data: any): Promise<TModel>;
    update<TModel>(modelName: string, data: any): Promise<TModel>;
    delete<TModel>(modelName: string, data: any): Promise<boolean>;
    private _setModifiedValues;
}
