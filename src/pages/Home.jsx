import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/FilterSlice.js';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const SERVER_URL = `https://67e142aa58cc6bf7852504fb.mockapi.io/items`;

  const dispatch = useDispatch();
  const { categoryId, sort, searchValue } = useSelector((state) => state.filter);

  const [pizzas, setPizzas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoader] = useState(true);

  const getPizzasFromDb = async (endpoint = SERVER_URL) => {
    try {
      setLoader(true);
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const search = searchValue ? `&search=${searchValue}` : '';
      const query = `${category}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${search}`;

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
  }, [categoryId, sort, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => {
    return <Skeleton key={index} />;
  });

  const pizzasArr = pizzas
    ? pizzas.map((pizza) => {
        return <PizzaBlock {...pizza} key={pizza.id} />;
      })
    : [];

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(id) => dispatch(setCategoryId(id))} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzasArr}</div>
        <Pagination onChangePage={(page) => setCurrentPage(page)} />
      </div>
    </>
  );
};

export default Home;
