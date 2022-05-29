import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../store/cart-context';
import { DeleteButton } from './DeleteButton';

interface CartItem {
  amount: number;
  id: number;
  total: number;
  title: string;
}
export const CartItem: React.FC<CartItem> = ({ amount, id, total, title }) => {
  const [currentAmount, setCurrentAmount] = useState(amount);

  const {
    changePrice,
    productsInCart,
    totalAmount,
    updateTotalAmount,
    calcTotalPrice,
    deleteProduct,
  } = useContext(CartContext);

  const changeAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    setCurrentAmount(newAmount);
    changePrice(id, newAmount);
    updateTotalAmount();
  };

  const deleteHandler = () => {
    deleteProduct(id);
  };

  useEffect(() => {
    calcTotalPrice();
  }, [productsInCart, totalAmount]);

  return (
    <li className="p-4 items-center gap-10 text-center sm:text-left flex flex-col sm:flex-row justify-between border-b-4">
      <p className="flex-1 ">{title}</p>
      <p>${total}</p>
      <input
        type="number"
        name="amount"
        id="amount"
        value={currentAmount}
        onChange={changeAmountHandler}
        className="w-14 rounded-sm p-1 border-black border-2"
        min="0"
      />
      <DeleteButton onClick={deleteHandler} />
    </li>
  );
};
