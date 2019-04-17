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
  date?: Date;
  meal?: 'breakfast' | 'lunch' | 'dinner' | null;
}
