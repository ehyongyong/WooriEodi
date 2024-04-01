import React, { useState } from "react";
import MapContainer from "../components/map/MapContainer";
import Search from "../components/map/Search";

function Map() {
    const [place, setPlace] = useState(""); // place 상태 관리

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginRight: '20px' }}>
                <Search setPlace={setPlace} /> {/* Search 컴포넌트에 setPlace 함수 전달 */}

            </div>
            <div>
                <MapContainer search={place} /> {/* MapContainer에 검색어 전달 */}
            </div>
        </div>
    );
}

export default Map;