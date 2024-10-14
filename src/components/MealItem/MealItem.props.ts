import { Meal } from '../Meals/Meals.props';

export interface MealItemProps {
  meal: Meal & { quantity: number };
}
