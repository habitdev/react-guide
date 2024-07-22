import MealItem from './MealItem';
import useHttp from '../../hook/useHttp';
import Error from '../error';

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);
  // 여기에 직접적으로 기본값 {}을 넣으면 컴포넌트가 재생성 될 때마다 같이 재생성되어 무한루프에 빠진다.

  if (isLoading) {
    return <p className='center'>Fetching Meals...</p>;
  }

  if (error) {
    return (
      <Error
        title='Failed to fetch meals'
        message={error}
      />
    );
  }

  return (
    <>
      {
        <ul id='meals'>
          {loadedMeals.map((meal) => (
            <li
              key={meal.id}
              className='meal-item'
            >
              <MealItem meal={meal} />
            </li>
          ))}
        </ul>
      }
    </>
  );
}
