import { SpinRequest, SpinRequestCreateInput, SpinRequestFilterInput, SpinRequestUpdateInput } from '../models/spinRequest';
export declare class SpinRequestResolver {
    private baseModelService;
    spinRequest(id: number): Promise<SpinRequest | undefined>;
    spinRequests(data?: SpinRequestFilterInput): Promise<SpinRequest[]>;
    createSpinRequest(data: SpinRequestCreateInput): Promise<SpinRequest>;
    updateSpinRequest(data: SpinRequestUpdateInput): Promise<SpinRequest>;
    deleteSpinRequest(id: number): Promise<boolean>;
}
