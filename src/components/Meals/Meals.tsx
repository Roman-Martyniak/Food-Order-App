import { FunctionComponent } from 'react';
import MealItem from '../MealItem/MealItem';
import Error from '../Error/Error';
import useHttp from '../../hooks/useHttp';
import { Meal } from './Meals.props';

const requestConfig = {};

const Meals: FunctionComponent = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp<Meal[]>('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals?.map(meal => <MealItem key={meal.id} meal={{ ...meal, quantity: 1 }} />) || (
        <p className="center">No meals available</p>
      )}
    </ul>
  );
};

export default Meals;
