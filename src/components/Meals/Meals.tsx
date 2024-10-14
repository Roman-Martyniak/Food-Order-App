import { FunctionComponent, useState, useEffect } from 'react';

import MealItem from '../MealItem/MealItem.tsx';
import { Meal, LoadedMeal } from './Meals.props.ts';

const Meals: FunctionComponent = () => {
  const [loadedMeals, setLoadedMeals] = useState<LoadedMeal[]>([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals');
      if (!response.ok) {
        console.error('Failed to fetch meals');
        return;
      }
      const meals: Meal[] = await response.json();
      const mealsWithQuantity = meals.map(meal => ({
        ...meal,
        quantity: 1,
      }));
      setLoadedMeals(mealsWithQuantity);
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map(meal => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
