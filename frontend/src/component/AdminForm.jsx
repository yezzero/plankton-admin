import React, { useState } from "react";
import "../styles/AdminForm.css";
import AdminCurrent from "./AdminCurrent";

export default function AdminForm() {
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("PDF 파일만 업로드 가능합니다.");
      event.target.value = "";
      setFile(null);
    }
  };

  return (
    <div className="form-container">
      <div className="form-information">
        <div className="form-address">
          <p>행사 주소</p>
          <input
            type="text"
            placeholder="행사가 개최되는 주소를 입력해주세요"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div className="form-file">
          <p>행사 정보</p>
          <label htmlFor="file-upload" className="form-custom-file-upload">
            {file ? (
              <h4>{file.name}</h4>
            ) : (
              <h4>행사에 대한 정보를 얻을 수 있는 파일 업로드(pdf)</h4>
            )}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <AdminCurrent />
      </div>

      <button className="form-submit">완료하기</button>
    </div>
  );
}
