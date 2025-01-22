import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, Card, Row, Col, Button } from "react-bootstrap";

const QrDisplayPage = () => {
  const location = useLocation();
  const { name, id } = location.state || {}; 

  console.log(name, id);
  const [qrData, setQrData] = useState({});
    const batchId = id; 
  
    const generateQrData = () => {
      const startTime = new Date(Date.now());
      const endTime = new Date(startTime.getTime() + 10 * 1000); 
  
  
  
      const data = {
        batchId,startTime,
        endTime:endTime,
      };
  console.log(data);
  
      setQrData(data);
    };
  
    useEffect(() => {
      generateQrData();
  
      const interval = setInterval(() => {
        generateQrData();
      }, 7000);
  
      return () => clearInterval(interval); 
    }, []);
  
    return (
      <div>
 
      <Navbar style={{ backgroundColor: "#5c0a89" }} variant="dark">
      <Container>
        <Navbar.Brand href="#" className="fw-bold">
          Luminar Attendance Manager
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-light" onClick={() => alert("Logged out")}>Logout</Button>
        </Nav>
      </Container>
    </Navbar>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>{name}</h2>
        {/* <h2>Ds B3</h2> */}
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
      </div>
    );
}

export default QrDisplayPage