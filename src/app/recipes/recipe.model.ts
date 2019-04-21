/**
 *
 *           RECIPE MODEL
 *
 * A single recipe is defined by the Recipe Model, basically it's used
 * to map the result of the API call which contains a lot of further info.
 *
 * the recipe model holds the following properties:
 *
 * - name --> the recipe title
 * - category --> recipe category
 * - subcategory --> recipe subcategory
 * - userId --> used when saving a recipe to firebase for filtering purposes
 * - ingredients --> array of ingredients for the recipe
 * - recipeId
 * - description --> recipe instructions
 * - imageURL --> in order to display a recipe picture
 * - imageSmallURL --> in order to display a recipe picture (but small...)
 * - date --> used when saving the recipe on firestore
 * - meal --> in order to insert the recipe in the proper array inside the daily menu
 */
export interface Recipe {
  name: string;
  category: string;
  subcategory: string;
  userId?: string;
  ingredients?: any[];
  recipeId: number;
  description?: string;
  imageURL: string;
  imageSmallURL: string;
  date?: any;
  meal?: 'breakfast' | 'lunch' | 'dinner' | null;
}
