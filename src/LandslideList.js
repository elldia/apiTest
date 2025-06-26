    // src/LandslideList.js

    import React from 'react';

    // LandslideList 컴포넌트는 'landslides'라는 이름의 props를 받습니다.
    function LandslideList(props) {
    // props.landslides에 상위 컴포넌트가 전달해준 산사태 데이터 배열이 들어있어요.
    const landslides = props.landslides;
    const isLoading = props.isLoading;
    const error = props.error;

    if (isLoading) {
        return <p>산사태 정보를 불러오는 중입니다...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>오류 발생: {error}</p>;
    }

    // 데이터가 없으면 메시지를 보여줍니다.
    if (!landslides || landslides.length === 0) {
        return <p>표시할 산사태 정보가 없습니다.</p>;
    }

    // 데이터가 있으면 리스트 형태로 보여줍니다.
    return (
        <div>
        <h2>최신 산사태 정보</h2>
        <ul>
            {/* map 함수를 사용해서 배열의 각 항목을 <li> 태그로 변환합니다. */}
            {landslides.map((item, index) => (
            <li key={index} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <p><strong>지역:</strong> {item.admNm || '정보 없음'}</p> {/* API 응답 필드명 확인 필요 */}
                <p><strong>발생일:</strong> {item.occrnDt || '정보 없음'}</p> {/* API 응답 필드명 확인 필요 */}
                {/* API 문서에 있는 다른 유용한 정보가 있다면 여기에 추가할 수 있어요. */}
            </li>
            ))}
        </ul>
        </div>
    );
    }

    export default LandslideList;