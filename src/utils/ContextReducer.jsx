const { createContext, useReducer, Children, useMemo } = require('react');

export const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: action.payload.id,
          tempId: action.payload.tempId,
          name: action.payload.name,
          price: action.payload.price,
          qty: action.payload.qty,
          size: action.payload.priceOptions,
          img: action.payload.img,
        },
      ];

    case 'UPDATE':
      let arr = [...state];

      arr.find((food, index) => {
        if (food.tempId === action.payload.tempId) {
          arr[index] = {
            ...food,
            qty: parseInt(action.payload.qty) + parseInt(food.qty),
            price: action.payload.price + food.price,
          };
        }
      });
      return arr;

    case 'INCREMENT':
      let increment = [...state];

      increment.find((food, index) => {
        if (food.tempId === action.payload.tempId) {
          increment[index] = {
            ...food,
            qty: food.qty + 1,
            price: food.price + action.payload.unitPrice,
          };
        }
      });
      return increment;
    case 'DECREMENT':
      let decrement = [...state];

      decrement.find((food, index) => {
        if (food.tempId === action.payload.tempId) {
          decrement[index] = {
            ...food,
            qty: food.qty - 1,
            price: food.price - action.payload.unitPrice,
          };
        }
      });
      return decrement;

    case 'REMOVE':
      const newRemoveArray = state.filter((food, index) => {
        return index !== action.payload.index;
      });

      return newRemoveArray;
    case 'DROP':
      let emptyArray = [];

      return emptyArray;

    default:
      console.log('Hello');
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
