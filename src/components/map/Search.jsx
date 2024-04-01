import React, { useState, useEffect } from "react";
import cardList from './dummy'

const Search = ({ setPlace, resultList }) => {
    const [inputText, setInputText] = useState("");
    const [empty, isEmpty] = useState(false);

    useEffect(() => {
        if (resultList != null) {
            isEmpty(true);
        } else {
            isEmpty(false);
        }
    }, [resultList]);

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
        <form onSubmit={handleSubmit} className="relative border-b border-gray-300 py-2 px-4 bg-white">
            <div className="flex justify-between items-center pt-12">
                <input
                    type="search"
                    name="search"
                    placeholder="검색어를 입력하세요"
                    onChange={onChange}
                    value={inputText}
                    className="bg-gray-200 text-gray-600 rounded-md py-1 px-3 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
                <button
                    type="submit"
                    className="bg-gray-200 text-gray-600 rounded-md py-1 px-3 hover:bg-gray-300 hover:text-white text-sm"
                >
                    검색
                </button>
            </div>
            <div>
                <ul>
                    {empty && resultList.map((item, index) => (
                        <li className='border border-black p-4 mb-2' key={index}>
                            <a href={item.place_url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-blue-600">
                                {item.place_name}
                            </a>
                            <div className="text-sm">{item.road_address_name}</div>
                            <div className="text-sm">{item.phone}</div>
                            <div className='flex flex-row text-lg font-semibold text-lime-500'>카드혜택
                                {findCardBenefits(item.category_group_name)}</div>
                        </li>
                    ))}
                </ul>
            </div>

        </form>
    );
};

export default Search;
