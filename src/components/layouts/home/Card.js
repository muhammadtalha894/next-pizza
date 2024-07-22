import { CartContext } from '@/utils/ContextReducer';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';

function Card(props) {
  const { dispatch, state } = useContext(CartContext);
  const data = props.data;

  const priceOptions = Object.keys(data.price);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);

  const handleQty = (e) => {
    setQty(parseInt(e.target.value));
  };
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  const handleAddToCart = async () => {
    const updateState = await state.find((id) => id.tempId === data._id + size);

    if (updateState) {
      dispatch({
        type: 'UPDATE',
        payload: {
          tempId: data._id + size,
          price: finalResult,
          qty: qty,
        },
      });
    }

    if (!updateState) {
      dispatch({
        type: 'ADD',
        payload: {
          id: data._id,
          tempId: data._id + size,
          name: data.name,
          price: finalResult,
          qty: qty,
          priceOptions: size,
          img: data.img,
        },
      });
    }
  };

  const finalResult = qty * parseInt(data.price[size]);

  return (
    <div className='box'>
      <div className='w-80 rounded-lg bg-white overflow-hidden dark:bg-black border-gradient'>
        <Link href={{ pathname: '/item/[id]' }} as={`item/${data._id}`}>
          <div className='relative w-full h-80'>
            <Image src={data.img} layout='fill' objectFit='cover' alt='pizza' />
          </div>
          <div className='p-4'>
            <div className='font-bold mb-2 text-xl uppercase'> {data.name}</div>
            <p className=' short_description text-gray-700 dark:text-gray-400 text-base'>
              {data.description}
            </p>
          </div>
        </Link>
        <div className='flex px-4 justify-between'>
          <select
            className=' h-100  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded'
            onChange={handleQty}
          >
            {Array.from(Array(9), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className=' h-100  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded'
            onChange={handleSize}
          >
            {priceOptions.map((options) => {
              return (
                <option className='' key={options} value={options}>
                  {options}
                </option>
              );
            })}
          </select>
        </div>
        <div className='flex p-4 font-bold  justify-between'>
          <button
            onClick={handleAddToCart}
            className='border dark:border-gray-400 text-gray-800 dark:text-white border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100 '
          >
            Add to cart
          </button>
          <p className='p-2 text-xl text-gray-800 dark:text-white'>
            Rs.{finalResult}/-
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
