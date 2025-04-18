import { useState } from 'react';
import styles from './Pizza-block.module.scss';
import defaultPizzaImg from '../../assets/img/Pizza.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCartItemByIdSelector } from '../../redux/slices/CartSlice';
import { CartItemType } from '../../redux/slices/types';

type PizzaBlockProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl = defaultPizzaImg,
  sizes,
  types,
}) => {
  const typeNames: string[] = ['тонкое', 'традиционное'];

  const dispatch = useDispatch();

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const onclickAddPizza = () => {
    const item: CartItemType = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: typeNames[activeType],
      count: 0,
    };

    dispatch(addItem(item));
  };

  const cartItem = useSelector(getCartItemByIdSelector(id));

  const cartItemCountAdd = cartItem ? cartItem.count : 0;

  return (
    <div className={styles.pizza__block__wrapper}>
      <div className={styles.pizza__block}>
        <img className={styles.pizza__block__image} src={imageUrl} alt="Pizza" />
        <h4 className={styles.pizza__block__title}>{title}</h4>
        <div className={styles.pizza__block__selector}>
          <ul>
            {types.map((typeId, index) => {
              return (
                <li
                  key={index}
                  className={activeType === index ? `${styles.active}` : ''}
                  onClick={() => {
                    setActiveType(index);
                  }}>
                  {typeNames[typeId]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((size, index) => {
              return (
                <li
                  key={index}
                  className={activeSize === index ? `${styles.active}` : ''}
                  onClick={() => {
                    setActiveSize(index);
                  }}>
                  {size} см.
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.pizza__block__bottom}>
          <div className={styles.pizza__block__price}>от {price} ₽</div>
          <button className="button button--outline button--add" onClick={onclickAddPizza}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {cartItemCountAdd > 0 && <i>{cartItemCountAdd}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
