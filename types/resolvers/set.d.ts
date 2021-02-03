import { Set, SetCreateInput, SetFilterInput, SetUpdateInput } from '../models/set';
import { Card } from '../models/card';
import { SetLocalization } from '../models/setLocalization';
export declare class SetResolver {
    private baseModelService;
    set(id: number): Promise<Set | undefined>;
    sets(data?: SetFilterInput): Promise<Set[]>;
    createSet(data: SetCreateInput): Promise<Set>;
    updateSet(data: SetUpdateInput): Promise<Set>;
    deleteSet(id: number): Promise<boolean>;
    cards(set: Set): Promise<Card[]>;
    localizations(set: Set): Promise<SetLocalization[]>;
}
