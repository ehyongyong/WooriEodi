import React, { useState } from "react";
import MapContainer from "../components/map/MapContainer";
import Search from "../components/map/Search";
import MapNavbar from "../components/map/MapNavbar";

function Map() {
    const [place, setPlace] = useState(""); // place 상태 관리
    const [resultList, setResultList] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    const updateResults = (newResults) => {
        setResultList(newResults);
    }

    return (
        <div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div /*style={{ marginRight: '20px' }}*/>
                    <Search setPlace={setPlace} resultList={resultList} />
                </div>
                <div>
                    <MapContainer search={place} setResultList={setResultList} /> {/* MapContainer에 검색어 전달 */}
                </div>
            </div>
        </div>
    );
}

export default Map;                