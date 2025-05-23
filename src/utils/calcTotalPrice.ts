import { CartItemType } from '../redux/slices/types';

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
