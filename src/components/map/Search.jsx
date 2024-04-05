import React, { useState, useEffect } from "react";
import cardList from './dummy'

const Search = ({ setPlace, resultList }) => {
    const [inputText, setInputText] = useState("");

    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlace(inputText);

        setInputText("");
        console.log(inputText);
    };

    const findCardBenefits = (category) => {
        return cardList.filter((card) => card.benefit === category).map(card => (
            <div key={card.cardName} className='text-black'>
                &nbsp; {card.cardName} {card.content}
            </div>
        ));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="relative border-b border-gray-300 py-2 px-4 bg-white">
                <div className="flex justify-between items-center">
                    <input
                        type="search"
                        name="search"
                        placeholder="검색어를 입력하세요"
                        onChange={onChange}
                        value={inputText}
                        className="bg-gray-200 text-gray-600 rounded-md py-1 px-3 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent mr-4 w-full md:w-auto"
                    />

                    <button
                        type="submit"
                        className="bg-brand text-white rounded-md py-1 px-3 hover:bg-brand-dark text-sm w-full md:w-auto mt-2 md:mt-0 md:ml-4"
                    >
                        검색
                    </button>
                </div>


            </form>
            <ul>
                {
                    resultList && resultList.length > 0 && resultList.map((item, index) => (
                        <li className='border border-brand p-4 mb-2' key={index}>
                            <a href={item.place_url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-brand">
                                {item.place_name}
                            </a>
                            <div className="text-sm">{item.road_address_name}</div>
                            <div className="text-sm">{item.phone}</div>
                            <div className='flex flex-row text-sm font-semibold' style={{ color: '#36BC9B' }}>카드혜택
                                {findCardBenefits(item.category_group_name)}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Search;
