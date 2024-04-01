import React from 'react';
import { FaDog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header className='relative border-b border-gray-300 py-2 px-4 bg-white'>

            <div className='flex justify-between items-center pt-12'>
                <Link to='/' className='flex items-center text-2xl text-brand font-semibold'>
                    <FaDog className='mr-2 text-3xl text-brand' />
                    <h1>Woorieodi</h1>
                </Link>
                <div className='absolute right-0 top-0 flex items-center gap-4'>
                    <button className='bg-gray-200 text-gray-600 rounded-md py-1 px-3 hover:bg-gray-300 hover:text-white text-sm'>
                        로그인
                    </button>
                    <button className='bg-gray-200 text-gray-600 rounded-md py-1 px-3 hover:bg-gray-300 hover:text-white text-sm'>
                        회원가입
                    </button>
                    <button className='bg-gray-200 text-gray-600 rounded-md py-1 px-3 hover:bg-gray-300 hover:text-white text-sm'>
                        고객센터
                    </button>
                </div>
                <nav className='flex items-center gap-4 font-semibold'>
                    <Link to='/map' className='hover:text-brand text-gray-600'>
                        지도
                    </Link>
                    <Link to='/card' className='hover:text-brand text-gray-600'>
                        카드
                    </Link>
                    <Link to='/subscribe' className='hover:text-brand text-gray-600'>
                        구독
                    </Link>
                    <Link to='/mypage' className='hover:text-brand text-gray-600'>
                        마이페이지
                    </Link>
                </nav>
            </div>
        </header>
    );
}