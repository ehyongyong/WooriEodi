import React from 'react';

export default function MapNavbar({ setPlace }) { // setPlace prop 추가
    const handleSetPlace = (categoryCode) => {

        setPlace(categoryCode);
        setSelectedCategory(categoryCode);
    };

    return (
        <header className='relative border-b border-gray-300 py-2 px-4 bg-white'>
            <div className='flex justify-between items-center'>
                <nav className='flex items-center gap-4 font-semibold'>
                    {/* 클릭 이벤트로 setPlace 함수 호출 */}
                    <button onClick={() => handleSetPlace('MT1')} className='hover:text-brand text-gray-600 py-2 text-sm'>
                        내 주변
                    </button>
                    <button onClick={() => handleSetPlace('FD6')} className='hover:text-brand text-gray-600 py-2 text-sm'>
                        음식점
                    </button>
                    <button onClick={() => handleSetPlace('CE7')} className='hover:text-brand text-gray-600 py-2 text-sm'>
                        까페
                    </button>
                    <button onClick={() => handleSetPlace('OL7')} className='hover:text-brand text-gray-600 py-2 text-sm'>
                        주유소
                    </button>
                    <button onClick={() => handleSetPlace('CS2')} className='hover:text-brand text-gray-600 py-2 text-sm'>
                        편의점
                    </button>
                    <button onClick={() => handleSetPlace('CT1')} className='hover:text-brand text-gray-600 py-2 text-sm'>
                        문화시설
                    </button>
                    {/* 나머지 메뉴 항목도 같은 방식으로 추가 */}
                </nav>
            </div>
        </header>
    );
}
