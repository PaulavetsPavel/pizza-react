import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/FilterSlice.js';
import { useNavigate } from 'react-router';

import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { sortList } from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const SERVER_URL = `https://67e142aa58cc6bf7852504fb.mockapi.io/items`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // есть параметры поиска
  const isSearch = useRef(false);
  // первый рендеринг
  const isMounted = useRef(false);

  const { categoryId, sort, searchValue, currentPage } = useSelector((state) => state.filter);

  const [pizzas, setPizzas] = useState([]);

  const [isLoading, setLoader] = useState(true);

  const getPizzasFromDb = async (endpoint = SERVER_URL) => {
    try {
      setLoader(true);
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const search = searchValue ? `&search=${searchValue}` : '';
      const query = `${category}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${search}`;

      // const response = await fetch(`${endpoint}?${query}`);
      const response = await axios.get(`${endpoint}?${query}`);

      if (response.statusText !== 'OK') throw new Error(response.statusText);
      setPizzas(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    // при первом рендере не записывать параметры поиска в строку поиска
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    // если есть параметры поиска, то записать их в redux
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzasFromDb();
    }
    isSearch.current = false;
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
        <Pagination onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
