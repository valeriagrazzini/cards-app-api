import { SpinRequest, SpinRequestCreateInput, SpinRequestFilterInput, SpinRequestUpdateInput, SpinRequestPaginatedResult } from '../models/spinRequest';
export declare class SpinRequestResolver {
    private baseModelService;
    spinRequest(id: number): Promise<SpinRequest | undefined>;
    spinRequests(data?: SpinRequestFilterInput): Promise<SpinRequest[]>;
    spinRequestsPaginated(offset: number, take: number, filters?: SpinRequestFilterInput): Promise<SpinRequestPaginatedResult>;
    createSpinRequest(data: SpinRequestCreateInput): Promise<SpinRequest>;
    updateSpinRequest(data: SpinRequestUpdateInput): Promise<SpinRequest>;
    deleteSpinRequest(id: number): Promise<boolean>;
    isExpired(spinRequest: SpinRequest): Promise<boolean>;
}
