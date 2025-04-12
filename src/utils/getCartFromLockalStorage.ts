import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLockalStorage = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];

  const totalPrice = calcTotalPrice(items);

  if (items.length) {
    return { items, totalPrice };
  }
  return { items: [], totalPrice: 0 };
};
