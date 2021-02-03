import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipeService';
export declare class RecipeResolver {
    private recipeService;
    constructor(recipeService: RecipeService);
    recipe(id: number): Promise<Recipe | undefined>;
}
