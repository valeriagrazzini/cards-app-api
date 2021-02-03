export declare class BaseModelService {
    findOne<TModel>(modelName: string, data: any): Promise<TModel | undefined>;
    findAll<TModel>(modelName: string, data?: any): Promise<TModel[]>;
    create<TModel>(modelName: string, data: any): Promise<TModel>;
    update<TModel>(modelName: string, data: any): Promise<TModel>;
    delete<TModel>(modelName: string, data: any): Promise<boolean>;
}
