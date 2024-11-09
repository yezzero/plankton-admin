import React from "react";
import "../styles/AdminReport.css";

export default function AdminReport() {
  const reports = [
    {
      title: "유모차",
      content: "유모차 지나다니는 길이 쓰레기로 막혀서 다닐 수가 없어요",
      category: 1,
      img: "/logo192.png",
    },
    {
      title: "음료 자판기",
      content:
        "입구 쪽 음료 자판기가 고장 나서 사용이 불가한 상태입니다. 많은 관람객이 이용 중인데 점검 부탁드립니다.",
      category: 1,
      img: null,
    },
    {
      title: "울타리 파손",
      content:
        "메인 구역 앞쪽 안전 울타리가 파손됐어요!! 관람객들이 다치지 않도록 빠른 수습 부탁드립니다!!",
      category: 1,
      img: null,
    },
    {
      title: "유모차",
      content:
        "어린이들이 많은 A구역에 인파가 밀리고 있어요... 안전 관리가 필요할 것 같습니다.",
      category: 0,
      img: "/logo.png",
    },
  ];

  return (
    <div className="report-container">
      <div className="report-list">
        {reports.map((element, index) => {
          return (
            <div className="report-box">
              {element.img && (
                <img
                  src={`${process.env.PUBLIC_URL + element.img} `}
                  alt={index}
                />
              )}
              <div className="report-content">
                {element.category === 0 ? (
                  <p>인명사고</p>
                ) : element.category === 1 ? (
                  <p>시설사고</p>
                ) : (
                  <p>범죄</p>
                )}
                <h1>{element.title}</h1>
                <h4>{element.content}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
