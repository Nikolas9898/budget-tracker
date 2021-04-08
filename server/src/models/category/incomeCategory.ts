import {Schema, model} from 'mongoose';
import Category from '../../interfaces/category';

const incomeCategorySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      minlength: 3
    },
    expenseCategories: {
      type: [
        {
          name: String
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

export default model<Category>('IncomeCategories', incomeCategorySchema);
