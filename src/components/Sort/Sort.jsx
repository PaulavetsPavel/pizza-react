import { useEffect, useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getFilterSelector, setSortType } from '../../redux/slices/FilterSlice';

import styles from './Sort.module.scss';

export const sortList = [
  { name: 'популярности (вниз)', sortProperty: 'rating' },
  { name: 'популярности (вверх)', sortProperty: '-rating' },
  { name: 'цене (вниз)', sortProperty: 'price' },
  { name: 'цене (вверх)', sortProperty: '-price' },
  { name: 'алфавиту (вниз)', sortProperty: 'title' },
  { name: 'алфавиту (вверх)', sortProperty: '-title' },
];

const Sort = () => {
  const { sort } = useSelector(getFilterSelector);
  const dispatch = useDispatch();
  const sortRef = useRef();
  const [isVisibleSortPopup, setIsVisibleSortPopup] = useState(false);

  const onClickSelectSort = (index) => {
    dispatch(setSortType(index));
    setIsVisibleSortPopup(false);
  };

  useEffect(() => {
    const handleClickOutsideSort = (e) => {
      const path = e.composedPath();
      if (!path.includes(sortRef.current)) setIsVisibleSortPopup(false);
    };
    // добавление обработчика при монтировании
    document.body.addEventListener('click', handleClickOutsideSort);
    // удаление обработчика при размонтировании
    return () => document.body.removeEventListener('click', handleClickOutsideSort);
  }, []);

  return (
    <div className={styles.sort} ref={sortRef}>
      <div className={styles.sort__label}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisibleSortPopup(!isVisibleSortPopup)}>{sort.name}</span>
      </div>
      {isVisibleSortPopup && (
        <div className={styles.sort__popup}>
          <ul>
            {sortList.map((sortItem, index) => (
              <li
                key={index}
                onClick={() => onClickSelectSort(sortItem)}
                className={sort.sortProperty === sortItem.sortProperty ? `${styles.active}` : ''}>
                {sortItem.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
