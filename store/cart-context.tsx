import React, { useMemo, useState } from 'react';

interface IProduct {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  price: string;
  amount: number;
  total: number;
}

type CartContextType = {
  productsInCart: IProduct[];
  totalAmount: number;
  totalPrice: number;
  addProduct: (product: IProduct) => void;
  updateProducts: (products: []) => void;
  deleteProduct: (id: number) => void;
  changeTotalAmount: (amount: number) => void;
  updateTotalAmount: () => void;
  changePrice: (id: number, amount: number) => void;
  calcTotalPrice: () => void;
  resetCart: () => void;
};

export const CartContext = React.createContext<CartContextType>({
  productsInCart: [],
  totalAmount: 0,
  totalPrice: 0,
  addProduct: () => {},
  updateProducts: () => {},
  deleteProduct: () => {},
  changeTotalAmount: () => {},
  updateTotalAmount: () => {},
  changePrice: () => {},
  calcTotalPrice: () => {},
  resetCart: () => {},
});

export function CartContextProvider(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productsInCart, setProductsInCart] = useState([]);

  const calcTotalPrice = () => {
    let calculatedTotal = 0;

    // Add every product's total price to calculatedTotal
    productsInCart.forEach((product) => {
      calculatedTotal += product.total;
    });

    setTotalPrice(calculatedTotal);
  };

  const addProduct = (product: IProduct) => {
    const matchedProduct = productsInCart.find(
      (cartProduct) => cartProduct.id === product.id
    );
    // If product already exists, update it's amount and price
    if (matchedProduct) {
      matchedProduct.amount += product.amount;
      changePrice(matchedProduct.id, matchedProduct.amount);
      return;
    }
    // Otherwise add new product to cart
    setProductsInCart((prev) => [...prev, product]);
  };

  const changePrice = (id: number, amount: number) => {
    // Update product's total price by given amount
    const matchedProduct = productsInCart.find(
      (cartProduct) => cartProduct.id === id
    );

    if (matchedProduct) {
      matchedProduct.amount = amount;

      let total = matchedProduct.amount * matchedProduct.price;

      matchedProduct.total = Number(total.toFixed(2));

      if (matchedProduct.amount === 0) {
        deleteProduct(matchedProduct.id);
      }
    }
  };

  const updateProducts = (products: IProduct[]) => {
    setProductsInCart(products);
  };

  const changeTotalAmount = (amount: number) => {
    setTotalAmount((prev) => (prev += amount));
  };

  const deleteProduct = (id: number) => {
    const matchedProduct = productsInCart.find(
      (cartProduct) => cartProduct.id === id
    );
    const newItems = productsInCart.filter(
      (product) => product.id !== matchedProduct.id
    );

    setProductsInCart(newItems);

    updateTotalAmount();
  };

  const resetCart = () => {
    setTotalAmount(0);
    setProductsInCart([]);
    setTotalPrice(0);
  };

  const updateTotalAmount = () => {
    // Update total amount of products inside the cart
    if (productsInCart.length === 0) {
      setTotalAmount(0);
    } else {
      let calculatedTotal = 0;

      productsInCart.forEach((product) => {
        calculatedTotal += product.amount;
      });

      setTotalAmount(calculatedTotal);
    }
  };

  const context = useMemo(
    () => ({
      productsInCart,
      totalAmount,
      totalPrice,
      resetCart,
      setProductsInCart,
      addProduct,
      updateProducts,
      deleteProduct,
      changeTotalAmount,
      updateTotalAmount,
      changePrice,
      calcTotalPrice,
    }),
    [productsInCart, totalAmount, totalPrice]
  );

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
}
