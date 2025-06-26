// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

        // ✅ JSON 응답 받는 주소 (_type=json 사용, 한글 파라미터 제거)
        const apiUrl = `https://apis.data.go.kr/B490007/qualAcquPtcond/getQualAcquPtcond?serviceKey=${SERVICE_KEY}&_type=json&numOfRows=10&pageNo=1&acquYy=2020&qualgbCd=T&rgnCd=001&ageGrupCd=3&genderCd=M&seriesCd=03&jmCd=1320`;

        console.log("요청 주소:", apiUrl);

        const response = await axios.get(apiUrl);

        console.log("응답 데이터:", response.data);

        const items = response.data?.response?.body?.items?.item;

        if (items) {
          const dataList = Array.isArray(items) ? items : [items];
          setSkillData(dataList);
        } else {
          setSkillData([]);
        }

      } catch (err) {
        console.error("데이터 가져오기 실패:", err);
        setError("데이터를 불러오는 데 실패했어요. API 키나 요청 주소를 다시 확인해 주세요.");
      } finally {
        setLoading(false);
      }
    }

    if (SERVICE_KEY && SERVICE_KEY !== 'YOUR_ENCODED_API_KEY_HERE') {
      fetchData();
    } else {
      setError("API 키가 비어 있어요! .env 파일을 확인해 주세요.");
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
                <div key={index} style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  margin: '10px 0',
                  borderRadius: '5px'
                }}>
                  <h3>정보 #{index + 1}</h3>
                  <p><strong>연도:</strong> {item.acquYy}</p>
                  <p><strong>월:</strong> {item.acquMm}</p>
                  <p><strong>자격종류:</strong> {item.qualgbNm}</p>
                  <p><strong>지역:</strong> {item.rgnNm}</p>
                  <p><strong>성별:</strong> {item.genderNm}</p>
                  <p><strong>종목명:</strong> {item.jmNm}</p>
                  <p><strong>취득인원:</strong> {item.acquCnt}명</p>
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
