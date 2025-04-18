import styles from './Search.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { getFilterSelector, setSearchValue } from '../../redux/slices/FilterSlice';
import { useRef, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

const Search: React.FC = () => {
  // локальный стэйт для изменения input без отправки запроса
  const [value, setValue] = useState<string>('');

  const dispatch = useDispatch();
  const { searchValue } = useSelector(getFilterSelector);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  const updatreSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // изменение value в input
    setValue(e.target.value);
    // отправка запроса после 500мс
    updatreSearchValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.search__icon}
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        className={styles.input__search}
        placeholder="Поиск пиццы ..."
        onChange={onChangeInput}
      />
      {searchValue && (
        <svg
          onClick={onClickClear}
          className={styles.close__icon}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
