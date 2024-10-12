import { FunctionComponent, useState, useEffect } from 'react';

import MealItem from '../MealItem/MealItem.tsx';
import { MealsProps } from './Meals.props.ts';

const Meals: FunctionComponent<MealsProps> = () => {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    async function fetchMeals(){
      const response = await fetch('http://localhost:3000/meals');

      const resData = await response.json();
      setMeals(resData);
    }

    fetchMeals()
  }, [])

  return (
    <>
      <ul id="meals">{meals.map(meal => <MealItem meal={meal}/>)}</ul>
    </>
  );
};

export default Meals;
