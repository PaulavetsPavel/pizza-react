import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const API_URL = `http://localhost:3001/pizzas`;
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setLoader] = useState(true);

  const getPizzas = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPizzas(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getPizzas();
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => {
              return <Skeleton key={index} />;
            })
          : pizzas.map((pizza) => {
              return <PizzaBlock {...pizza} key={pizza.id} />;
            })}
      </div>
    </>
  );
};

export default Home;
