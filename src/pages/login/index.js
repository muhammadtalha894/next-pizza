import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { baseUrl } from '@/utils/baseUrl';

function Login() {
  const router = useRouter();
  const [creatential, setCredentail] = useState({ email: '', password: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await (
        await fetch(`${baseUrl}api/userLogin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(creatential),
        })
      ).json();
      if (data.success) {
        console.log(data);
        localStorage.setItem('authToken', data.authToken);
        localStorage.setItem('email', creatential.email);
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
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
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
              htmlFor='email'
              className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'
            >
              Username
            </label>
            <input
              onChange={handleChange}
              placeholder='Enter your email/username'
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
          <div className='flex items-center justify-between'></div>
          <button
            type='submit'
            className='border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100'
          >
            Log in
          </button>
          <Link href={'/signup'} style={{ all: 'unset' }}>
            <button className='border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100'>
              New User?
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
