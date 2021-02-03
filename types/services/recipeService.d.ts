import { Recipe } from '../models/recipe';
export declare class RecipeService {
    findById(id: number): Promise<Recipe | undefined>;
}
