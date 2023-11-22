import mongoose, { type Document } from 'mongoose';

export interface RecipeType {
  userid: string;
  name: string;
  cookTime?: number;
  prepTime?: number;
  temperature?: number;
  description: string;
  method: string;
  ingredients: string[];
}

export interface RecipeDocument extends RecipeType, Document {
  createdAt: Date;
  updatedAt: Date;
}

const RecipeSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    cookTime: {
      type: Number,
    },
    prepTime: {
      type: Number,
    },
    temperature: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Recipe = mongoose.model<RecipeDocument>('Recipe', RecipeSchema);

export default Recipe;
