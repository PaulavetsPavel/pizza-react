import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/FilterSlice';
import { fetchAllPizzas, getPizzasSelector } from '../redux/slices/PizzasSlice';
import { useNavigate } from 'react-router';

import qs from 'qs';

import Categories from '../components/Categories/index';
import PizzaBlock from '../components/PizzaBlock/index';
import SortBlock, { sortList } from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/index';

const Home: React.FC = () => {
  // const SERVER_URL = `https://67e142aa58cc6bf7852504fb.mockapi.io/items`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // есть параметры поиска
  const isSearch = useRef(false);
  // первый рендеринг
  const isMounted = useRef(false);

  const { categoryId, sort, searchValue, currentPage } = useSelector(getFilterSelector);

  const { items, status } = useSelector(getPizzasSelector);

  const getPizzasFromDb = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '0';

    const sortBy = sort.sortProperty.replace('-', '');

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      //@ts-ignore
      fetchAllPizzas({ category, sortBy, order, search, currentPage })
    );
  };

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // useEffect(() => {
  //   // при первом рендере не записывать параметры поиска в строку поиска
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }

  //   isMounted.current = true;
  // }, [categoryId, sort, searchValue, currentPage]);

  // useEffect(() => {
  //   // если есть параметры поиска, то записать их в redux
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     // console.log(params);

  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy.sortProperty);
  //     if (sort) {
  //       params.sortBy = sort;
  //     }

  //     dispatch(
  //       setFilters({
  //         categoryId: Number(params.category),
  //         sort: sort || sortList[0],
  //         searchValue: params.search,
  //         currentPage: params.currentPage,
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

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

  const pizzasArr = items
    ? items.map((item: any) => {
        return <PizzaBlock {...item} key={item.id} />;
      })
    : [];

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <SortBlock value={sort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>Попробуйте позже</p>
          </div>
        ) : (
          <div className="content__items">{status === 'loading' ? skeletons : pizzasArr}</div>
        )}

        <Pagination onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
