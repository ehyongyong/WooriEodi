import React, { useEffect, useState } from 'react';
import Search from './Search';
import cardList from './dummy';
import styles from './MapContainer.module.css';
import MapNavbar from './MapNavbar';

const MapContainer = ({ search, setResultList }) => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            setMapLoaded(true);
        } else {
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
            searchPlaces(selectedCategory, undefined, currentPosition);
            getCurrentLocation();
        }
    }, [mapLoaded, search, selectedCategory, currentPosition]);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                setCurrentPosition({ lat, lon }); // 현재 위치 상태 업데이트
                const locPosition = new window.kakao.maps.LatLng(lat, lon);
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: locPosition,
                    level: 3,
                };
                const map = new window.kakao.maps.Map(mapContainer, mapOption);
                // 현재 위치 및 선택된 카테고리를 기반으로 장소 검색
                searchPlaces(selectedCategory, map, { lat, lon });
            });
        } else {
            alert('이 브라우저에서는 Geolocation이 지원되지 않습니다.');
        }
    };
    const searchPlaces = (categoryCode, map, currentPosition) => {
        window.kakao.maps.load(() => {
            let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
            if (!map && currentPosition) { // 현재 위치가 있을 경우에만 맵을 새로 생성
                let container = document.getElementById('map');
                let options = {
                    center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lon),
                    level: 3,
                };
                map = new window.kakao.maps.Map(container, options);
            }
            const ps = new kakao.maps.services.Places(map);

            // 현재 위치 기반으로 카테고리 검색
            if (currentPosition && categoryCode) {
                let locPosition = new kakao.maps.LatLng(currentPosition.lat, currentPosition.lon);
                ps.categorySearch(categoryCode, (data, status, pagination) => {
                    if (status === kakao.maps.services.Status.OK) {
                        let bounds = new kakao.maps.LatLngBounds();
                        for (let i = 0; i < data.length; i++) {
                            displayMarker(data[i], map);
                            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                        }
                        map.setBounds(bounds);
                        setResultList(data);
                    }
                }, { location: locPosition, radius: 100 }); // 여기서 radius는 필요에 따라 조정하세요.
            }
        });
    };

    // 'handleSetPlace' 함수 수정
    // const handleSetPlace = (categoryCode) => {
    //     if (currentPosition) {
    //         setSelectedCategory(categoryCode);
    //         const locPosition = new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lon);
    //         const mapContainer = document.getElementById('map');
    //         const mapOption = {
    //             center: locPosition,
    //             level: 3,
    //         };
    //         const map = new window.kakao.maps.Map(mapContainer, mapOption);
    //         searchPlaces(categoryCode, map, currentPosition); // 현재 위치 기반으로 장소 검색
    //     } else {
    //         alert('현재 위치를 찾을 수 없습니다.');
    //     }
    // };
    // const searchPlaces = (search, map, categoryCode, currentPosition) => {
    //     window.kakao.maps.load(() => {
    //         let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    //         if (!map) {
    //             let container = document.getElementById('map');
    //             let options = {
    //                 center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
    //                 level: 3,
    //             };
    //             map = new window.kakao.maps.Map(container, options);
    //         }
    //         const ps = new kakao.maps.services.Places(map);

    //         if (currentPosition) {
    //             let locPosition = new kakao.maps.LatLng(currentPosition.lat, currentPosition.lon);
    //             ps.categorySearch(categoryCode, (data, status, pagination) => {
    //                 if (status === kakao.maps.services.Status.OK) {
    //                     let bounds = new kakao.maps.LatLngBounds();

    //                     for (let i = 0; i < data.length; i++) {
    //                         // 현재 위치로부터 100m 이내의 장소만 필터링하여 표시
    //                         let distance = kakao.maps.geometry.spherical.computeDistanceBetween(locPosition, new kakao.maps.LatLng(data[i].y, data[i].x));
    //                         if (distance <= 100) {
    //                             displayMarker(data[i], map);
    //                             bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    //                         }
    //                     }
    //                     map.setBounds(bounds);
    //                     setResultList(data.filter(place => {
    //                         let distance = kakao.maps.geometry.spherical.computeDistanceBetween(locPosition, new kakao.maps.LatLng(place.y, place.x));
    //                         return distance <= 100;
    //                     }));
    //                 }
    //             }, { location: locPosition, radius: 100 });
    //         }
    //         ps.keywordSearch(search, (data, status, pagination) => {
    //             if (status === kakao.maps.services.Status.OK) {
    //                 let bounds = new kakao.maps.LatLngBounds();

    //                 for (let i = 0; i < data.length; i++) {
    //                     displayMarker(data[i], map);
    //                     bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    //                 }
    //                 map.setBounds(bounds);
    //                 setResultList(data);
    //             }
    //         }, { useMapBounds: true });
    //     });
    // };

    function displayMarker(place, map) {
        let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
        });
        let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
    // 내 주변 버튼 클릭 시 호출될 함수
    const handleSetPlace = (categoryCode) => {
        if (currentPosition) {
            setSelectedCategory(categoryCode); // 카테고리 설정 (예시)
            const locPosition = new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lon);
            const mapContainer = document.getElementById('map');
            const mapOption = {
                center: locPosition,
                level: 3,
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption);
            searchPlaces(categoryCode, map, currentPosition); // 현재 위치 기반으로 장소 검색
        } else {
            alert('현재 위치를 찾을 수 없습니다.');
        }
    };


    return (
        <div>
            <MapNavbar setPlace={handleSetPlace} />

            <div className={styles.map_wrap}>
                <div id="map" style={{ width: '1200px', height: '800px', position: 'relative', overflow: 'hidden' }}></div>
            </div>
        </div>
    );
};

export default MapContainer;
