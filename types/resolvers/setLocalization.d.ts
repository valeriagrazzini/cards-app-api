import { Set } from '../models/set';
import { SetLocalization, SetLocalizationCreateInput, SetLocalizationFilterInput, SetLocalizationUpdateInput } from '../models/setLocalization';
export declare class SetLocalizationResolver {
    private baseModelService;
    setLocalization(id: number): Promise<SetLocalization | undefined>;
    setLocalizations(data?: SetLocalizationFilterInput): Promise<SetLocalization[]>;
    createSetLocalization(data: SetLocalizationCreateInput): Promise<SetLocalization>;
    updateSetLocalization(data: SetLocalizationUpdateInput): Promise<Set>;
    deleteSetLocalization(id: number): Promise<boolean>;
}
