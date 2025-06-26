// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { xml2json } from 'xml-js'; // <-- 이 줄은 이제 필요 없으므로 삭제하거나 주석 처리하세요!

function App() {
  const [skillData, setSkillData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SERVICE_KEY = import.meta.env.VITE_SKILL_API_KEY;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // ★★★ 이 부분을 수정합니다! ★★★
        // 1. '_type=json' 파라미터 추가
        // 2. 다른 필수 파라미터 (예: yyyy, mm)가 있다면 추가
        // 블로그 예시처럼 'yyyy', 'mm'은 필수가 아닐 수 있으니 일단은 빼고 해보거나,
        // 현재 2025년이므로 'yyyy=2024' 같은 최근 연도를 넣어보세요.
        //const apiUrl = `/B490007/qualAcquPtcond/getQualAcquPtcond?serviceKey=${SERVICE_KEY}&numOfRows=10&pageNo=1&dataFormat=json&acquYy=2020&qualgbCd=T&rgnCd=001&ageGrupCd=3&genderCd=M&seriesCd=03&jmCd=1320`;
        //const apiUrl = `/B490007/qualAcquPtcond/getQualAcquPtcond?serviceKey=${SERVICE_KEY}&_type=json&pageNo=1&numOfRows=10&acquYy=2020&jmCd=1320`;

        const apiUrl = `/B490007/qualAcquPtcond/getQualAcquPtcond?serviceKey=${SERVICE_KEY}&_type=json&pageNo=1&numOfRows=10&acquYy=2020&qualgbCd=T&rgnCd=001&ageGrupCd=3&genderCd=M&seriesCd=03&jmCd=1320`;

        // 예시: 특정 연도와 월을 지정한다면:
        // const apiUrl = `/B490007/qualAcquPtcondAPI?ServiceKey=${SERVICE_KEY}&pageNo=1&numOfRows=2&yyyy=2024&mm=01&_type=json`;
        //https://apis.data.go.kr/B490007/qualAcquPtcond/getQualAcquPtcond?serviceKey=KJ4XKjinH%2B9wYDJi3KitlVP2GFUbJ%2BsxT9DqmdJH%2BpQmHv%2FeNuM8o9jb%2FKQ1zMlTjG5CS4S%2FCJO0mvo8yU3GVQ%3D%3D&numOfRows=10&pageNo=1&dataFormat=xml&acquYy=2020&qualgbCd=T&rgnCd=001&ageGrupCd=3&genderCd=M&seriesCd=03&jmCd=1320&jmNm=%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC

        console.log("요청 주소:", apiUrl);
        const response = await axios.get(apiUrl);
        console.log("전체 응답:", response.data);
        // ★★★ 이 부분을 수정합니다! ★★★
        // 이제 XML이 아닌 JSON을 받으므로 xml-js 관련 코드는 삭제합니다.
        // console.log("★★직접 받은 JSON 데이터 구조:★★", response.data); // 서버에서 직접 받은 JSON 구조 확인용

        // 블로그 글에 나온 데이터 접근 방식 (API 응답 구조에 따라 다를 수 있습니다.)
        if (response.data &&
            response.data.response &&
            response.data.response.body &&
            response.data.response.body.items) { // items 자체가 배열일 수도 있습니다.
            
          // items가 배열일 수도 있고, item 안에 배열이 있을 수도 있습니다.
          // 블로그 예시와 여러분의 API 미리보기 XML을 종합하면
          // response -> body -> items -> item (item이 실제 데이터 배열)
          // 형태일 가능성이 높습니다.
          const items = Array.isArray(response.data.response.body.items.item) ?
                        response.data.response.body.items.item :
                        [response.data.response.body.items.item]; // 단일 항목일 경우 배열로 감싸기

          setSkillData(items);

        } else {
          setSkillData([]); // 데이터가 없으면 빈 배열로 설정
        }

      } catch (err) {
        console.error("데이터 가져오기 실패:", err);
        setError("데이터를 가져오는 데 문제가 생겼어요. API 키, URL, 또는 파라미터를 확인하거나 잠시 후 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    }

    if (SERVICE_KEY && SERVICE_KEY !== 'YOUR_ENCODED_API_KEY_HERE') {
      fetchData();
    } else {
      setError("API 키가 잘못됐거나 없어요. .env 파일을 확인해 주세요!");
      setLoading(false);
    }
  }, [SERVICE_KEY]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>국가자격취득자 현황</h1>

      {loading && <p>데이터를 불러오는 중입니다...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div>
          {skillData.length > 0 ? (
            <div>
              {skillData.map((item, index) => (
                <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
                  <h3>정보 #{index + 1}</h3>
                  {/* 블로그 글이나 미리보기 XML에 나온 실제 필드명을 사용하세요. */}
                  {/* JSON으로 받으면 '_text' 없이 바로 필드명으로 접근 가능합니다. */}
                  <p><strong>연도:</strong> {item.acquYy || '없음'}</p>
                  <p><strong>월:</strong> {item.acquMm || '없음'}</p>
                  <p><strong>자격종류:</strong> {item.qualgbNm || '없음'}</p>
                  <p><strong>지역:</strong> {item.rgnNm || '없음'}</p>
                  <p><strong>성별:</strong> {item.genderNm || '없음'}</p>
                  <p><strong>종목명:</strong> {item.jmNm || '없음'}</p>
                  <p><strong>취득인원:</strong> {item.acquCnt || '없음'}명</p>
                </div>
              ))}
            </div>
          ) : (
            <p>보여줄 데이터가 없어요.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;