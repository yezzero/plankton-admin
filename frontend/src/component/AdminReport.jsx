import React, { useState, useEffect } from "react";
import "../styles/AdminReport.css";
import { report, getAccidents } from "../services/chatbotService";

export default function AdminReport() {
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태
  const [accidentReports, setAccidentReports] = useState([]); // 사고 데이터

  useEffect(() => {
    const fetchAccidentReports = async () => {
      try {
        const response = await getAccidents();
        if (response.status === 200) {
          const accidentData = response.data;
          setAccidentReports(accidentData);
          accidentData.forEach((accident) => {
            console.log("Longitude:", accident.longitude);
            console.log("Latitude:", accident.latitude);
          });
        } else {
          console.error("Failed to fetch accident data");
        }
      } catch (error) {
        console.error("Error fetching accident data:", error);
      }
    };

    fetchAccidentReports();
  }, []);

  const handleReportSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await report(title, content);
      if (response.status === 200) {
        alert("공지를 보냈습니다.");
        setTitle("");
        setContent("");
      } else {
        alert("공지 보내기에 실패했습니다.");
      }
    } catch (error) {
      console.error("Report submission error:", error);
    }
    setIsSubmitting(false);
  };

  const getImageSrc = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className="report-container">
      <div className="report-left">
        {accidentReports.map((accident) => (
          <div key={accident.accidentId} className="report-box">
            {accident.img && (
              <img
                src={getImageSrc(accident.img)} // Base64를 img src로 변환
                alt={`accident-${accident.accidentId}`}
              />
            )}
            <div className="report-content">
              {accident.category === 0 ? (
                <p>인명사고</p>
              ) : accident.category === 1 ? (
                <p>시설사고</p>
              ) : (
                <p>범죄</p>
              )}
              <h4>{accident.content}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="report-right">
        <div>
          <h3>제목</h3>
          <input
            placeholder="제목을 적어주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <h3>내용</h3>
          <input
            placeholder="내용을 적어주세요"
            style={{ height: "350px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button onClick={handleReportSubmit} disabled={isSubmitting}>
          {isSubmitting ? "제출 중..." : "공지하기"}
        </button>
      </div>
    </div>
  );
}
