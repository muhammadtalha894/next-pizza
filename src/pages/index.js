import CarouselComponent from '@/components/layouts/home/Carousel';
import { Inter } from 'next/font/google';
import Card from '@/components/layouts/home/Card';

import { useEffect, useState } from 'react';
import { baseUrl } from '@/utils/baseUrl';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ data }) {
  const [typeFilter, setTypeFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const categoriesSet = new Set();
    const foodDataArray = [];

    data?.forEach((item) => {
      categoriesSet.add(item.category);
      foodDataArray.push(item);
    });

    setCategories([...categoriesSet]);
    setFoodData(foodDataArray);
  }, [data]);

  return (
    <>
      <CarouselComponent />
      <div className='my-6 space-x-5'>
        <button
          className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
            !typeFilter && 'bg-slate-300 dark:bg-slate-600'
          }`}
          onClick={() => setTypeFilter(false)}
        >
          All
        </button>
        <button
          className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
            typeFilter === 'Veg' && 'bg-slate-300 dark:bg-slate-600'
          }`}
          onClick={() => setTypeFilter('Veg')}
        >
          <span
            className={
              'lowercase font-thin bg-white border-green-500 border mr-2 px-0.1 text-green-500'
            }
          >
            ●
          </span>
          Veg
        </button>
        <button
          className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
            typeFilter === 'Non-Veg' && 'bg-slate-300 dark:bg-slate-600'
          }`}
          onClick={() => setTypeFilter('Non-Veg')}
        >
          <span
            className={
              'lowercase font-thin bg-white border-red-500 border mr-2 px-0.1 text-red-500'
            }
          >
            ●
          </span>
          Non Veg
        </button>
      </div>

      <div className='container mx-auto'>
        {categories.map((category, index) => (
          <div key={category}>
            <div className='text-4xl mt-10 mb-3 uppercase font-bold pl-3'>
              {category}
            </div>
            <hr />
            <div
              className='flex flex-col items-center justify-center'
              key={index}
            >
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto'>
                {foodData
                  .filter((item) => item.category === category)
                  .filter((item) =>
                    typeFilter ? typeFilter === item.foodType : true,
                  )
                  .map((item) => (
                    <Card data={item} key={item.id} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  let data;
  try {
    const pizzaData = await fetch(`${baseUrl}api/food/foodData`)
      .then((res) => res.json())
      .catch((error) => error.message);

    data = await JSON.parse(JSON.stringify(pizzaData));
  } catch (error) {
    console.log(error);
  }

  return {
    props: { data: data || null },
  };
};
