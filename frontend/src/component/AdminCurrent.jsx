import "../styles/AdminCurrent.css";
import CurrentMap from "./CurrentMap";
import PolygonButton from "./PolygonButton";
import useGeolocation from "../hooks/useGeolocation";
import React, { useState } from "react";


export default function AdminCurrent() {
  const { currentMyLocation, locationLoading } = useGeolocation();
  const [isDrawing, setIsDrawing] = useState(false);

  const toggleDrawing = () => {
    setIsDrawing((prev) => !prev);
  };

  // 폴리곤을 데이터베이스에 저장하는 함수
  const savePolygonToDB = async (polygonPath) => {
    const polygonData = polygonPath.map((point) => ({
      lat: point.lat(),
      lng: point.lng(),
    }));
    console.log("저장할 폴리곤 데이터:", polygonData);
    // 여기에 DB 저장 로직 추가
  };

  return (
    <div className="current-container">
      <div className="current-map-box">
        {locationLoading ? (
          <p>Loading location...</p>
        ) : (
          <CurrentMap
            currentLocation={currentMyLocation}
            isDrawing={isDrawing}
            onSavePolygon={savePolygonToDB} // 함수 전달
          />
        )}
      </div>
      <div className="current-button-container">
        <PolygonButton isDrawing={isDrawing} onClick={toggleDrawing} />
      </div>
    </div>
  );
}
