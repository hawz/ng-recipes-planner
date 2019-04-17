export interface Recipe {
  name: string;
  category: string;
  subcategory: string;
  userUID?: string;
  recipeId: number;
  description?: string;
  imageURL: string;
  imageSmallURL: string;
  date?: Date;
  meal?: 'breakfast' | 'lunch' | 'dinner' | null;
}
