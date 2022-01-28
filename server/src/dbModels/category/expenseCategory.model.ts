import {Schema, model} from 'mongoose';
import Category from '../../models/category';

const expenseCategorySchema = new Schema(
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

export default model<Category>('ExpenseCategories', expenseCategorySchema);
