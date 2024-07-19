import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { baseUrl } from '@/utils/baseUrl';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();
  const [creatential, setCredentail] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await (
        await fetch(`${baseUrl}api/userSignup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(creatential),
        })
      ).json();
      if (data) {
        localStorage.setItem('authToken', data.authToken);
        localStorage.setItem('email', creatential.email);
        localStorage.setItem('isAdmin', data.isAdmin);
        router.push('/');
      } else {
        alert('Something Went Wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentail({ ...creatential, [name]: value });
  };
  return (
    <div
      style={{
        height: '90vh',
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
      }}
      className='flex justify-center items-center'
    >
      <div className='container w-full max-w-md'>
        <form
          onSubmit={handleSubmit}
          className='bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4'
        >
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'
            >
              Name
            </label>
            <input
              onChange={handleChange}
              placeholder='Enter your email'
              name='name'
              type='text'
              value={creatential.name}
              required
              className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'
            >
              Email
            </label>
            <input
              onChange={handleChange}
              placeholder='Enter your email'
              name='email'
              type='email'
              value={creatential.email}
              required
              className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'
            >
              Password
            </label>
            <input
              value={creatential.password}
              onChange={handleChange}
              placeholder='*******'
              name='password'
              required
              type='password'
              className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='address'
              className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'
            >
              Address
            </label>
            <input
              value={creatential.address}
              onChange={handleChange}
              placeholder='Enter Your Address'
              name='address'
              required
              type='text'
              className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='flex items-center justify-between'></div>
          <button
            type='submit'
            className='border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100'
          >
            Sign up
          </button>
          <Link href={'/login'} style={{ all: 'unset' }}>
            <button className='border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100'>
              Already a user?
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
