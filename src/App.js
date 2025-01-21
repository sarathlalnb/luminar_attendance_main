import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const [qrData, setQrData] = useState({});
  const batchName = "DS-SABIR-B2"; 

  const generateQrData = () => {
    const startTime = new Date(Date.now());
    const endTime = new Date(startTime.getTime() + 30 * 1000); 



    const data = {
      batchName,startTime,
      endTime:endTime,
    };
console.log(data);

    setQrData(data);
  };

  useEffect(() => {
    generateQrData();

    const interval = setInterval(() => {
      generateQrData();
    }, 30000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Luminar Attendance Management for Students</h1>
      <QRCodeCanvas
        value={qrData && Object.keys(qrData).length > 0 ? JSON.stringify(qrData) : "Generating..."}
        size={650}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={true}
      />
      <p>Scan the QR code to mark your attendance.</p>
    </div>
  );
}

export default App;
