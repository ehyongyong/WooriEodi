import React, { useEffect, useState } from 'react';
import Search from './Search';
import cardList from './dummy'
import styles from './MapContainer.module.css';
import MapNavbar from './MapNavbar';



const MapContainer = ({ search, setResultList }) => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    //const [currCategory, setCurrCategory] = useState('');
    // const [resultList, setResultList] = useState([]);

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            // 이미 로드된 경우
            setMapLoaded(true);
        } else {
            // 스크립트 로드
            const script = document.createElement('script');
            script.async = true;
            script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=197dacec70c914609bd8532c307994ed&autoload=false&libraries=services";
            document.head.appendChild(script);

            script.onload = () => {
                console.log("Kakao map script loaded successfully.");
                setMapLoaded(true);
            };
            script.onerror = (error) => {
                console.error("Failed to load Kakao map script:", error);
            };
        }
    }, []);

    useEffect(() => {
        if (mapLoaded) {
            searchPlaces(selectedCategory);
        }
    }, [mapLoaded, search, selectedCategory]); // 의존성 배열에 mapLoaded와 search 추가

    const searchPlaces = (categoryCode) => {
        window.kakao.maps.load(() => {
            let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
            let container = document.getElementById('map');
            let options = {
                center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
                level: 3
            };
            let map = new window.kakao.maps.Map(container, options);
            // ... 나머지 코드 ...
            const ps = new kakao.maps.services.Places(map);

            ps.categorySearch(categoryCode, placesSearch, { useMapBounds: true });
            console.log(categoryCode);
            ps.keywordSearch(search, placesSearch);
            // ps.categorySearch('BK9', placesSearchCB, { useMapBounds: true });

            function placesSearch(data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {
                    let bounds = new kakao.maps.LatLngBounds();

                    for (let i = 0; i < data.length; i++) {
                        displayMarker(data[i], map);
                        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                    }
                    //displayPagination(pagination);
                    map.setBounds(bounds);
                    setResultList(data);
                    console.log(data);
                }
            }
            function displayMarker(place, map) {
                let marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(place.y, place.x),
                });
                kakao.maps.event.addListener(marker, 'click', function () {
                    // 마커를 클릭하면 장소명이 인포윈도우에 표출
                    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                    infowindow.open(map, marker);
                });

            }

        });
    };


    // 컴포넌트 반환은 useEffect 바깥에서 처리
    return (
        <div>
            <MapNavbar setPlace={setSelectedCategory} />
            <div className={styles.map_wrap}>
                <div id="map" style={{ width: '1200px', height: '800px', position: 'relative', overflow: 'hidden' }}></div>
            </div>
        </div>

    );
};

export default MapContainer;
