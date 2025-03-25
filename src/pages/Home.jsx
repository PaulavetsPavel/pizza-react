import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = ({ searchValue }) => {
  const SERVER_URL = `https://67e142aa58cc6bf7852504fb.mockapi.io/items`;

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности (вниз)', sortProperty: 'rating' });

  const getPizzasFromDb = async (endpoint = SERVER_URL) => {
    try {
      setLoader(true);
      const category = categoryId > 0 ? `category=${categoryId}&` : '';
      const sortBy = sortType.sortProperty.replace('-', '');
      const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
      const query = `${category}sortBy=${sortBy}&order=${order}`;

      const response = await fetch(`${endpoint}?${query}`);

      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  const getPizzas = async () => {
    const items = await getPizzasFromDb();
    setPizzas(items);
  };

  useEffect(() => {
    getPizzas();

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const skeletons = [...new Array(6)].map((_, index) => {
    return <Skeleton key={index} />;
  });

  const pizzasArr = pizzas
    .filter((pizza) => {
      if (pizza.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((pizza) => {
      return <PizzaBlock {...pizza} key={pizza.id} />;
    });

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
          <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzasArr}</div>
      </div>
    </>
  );
};

export default Home;
