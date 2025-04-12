import { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setSortType } from '../../redux/slices/FilterSlice';

import styles from './Sort.module.scss';
import React from 'react';
import { SortItem, SortPropertyEnum } from '../../redux/slices/types';

export const sortList: SortItem[] = [
  { name: 'популярности (вниз)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (вверх)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене (вниз)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (вверх)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (вниз)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (вверх)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

type SortBlockProps = {
  value: SortItem;
};

const SortBlock: React.FC<SortBlockProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);
  const [isVisibleSortPopup, setIsVisibleSortPopup] = useState<boolean>(false);

  const onClickSelectSort = (index: SortItem) => {
    dispatch(setSortType(index));
    setIsVisibleSortPopup(false);
  };

  useEffect(() => {
    const handleClickOutsideSort = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current))
        setIsVisibleSortPopup(false);
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
        <span onClick={() => setIsVisibleSortPopup(!isVisibleSortPopup)}>{value.name}</span>
      </div>
      {isVisibleSortPopup && (
        <div className={styles.sort__popup}>
          <ul>
            {sortList.map((sortItem, index) => (
              <li
                key={index}
                onClick={() => onClickSelectSort(sortItem)}
                className={value.sortProperty === sortItem.sortProperty ? `${styles.active}` : ''}>
                {sortItem.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortBlock;
