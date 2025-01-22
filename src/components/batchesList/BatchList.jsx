import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BatchList = () => {
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchBatches = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authorization token is missing");
        return;
      }

      try {
        const response = await axios.get("https://api.crm.luminartechnolab.com/api/batch?_end=5&_order=DESC&_sort=createdAt&_start=0&filter=%5B%5D", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const currentDate = new Date();
        const validBatches = response.data.filter(batch => new Date(batch.startDate) <= currentDate);

        setBatches(validBatches || []);
      } catch (error) {
        console.error("Error fetching batch list", error);
        alert("Failed to fetch batches. Please try again later.");
      }
    };

    fetchBatches();
  }, []);

  const handleCardClick = (batch) => {
    navigate(`/qrPage`, { state: { name: batch.name, id: batch._id } });
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token"); // Remove the token from sessionStorage
      navigate("/"); // Navigate to login page or wherever needed
    }
  };

  return (
    <div style={{ backgroundColor: "#6a0dad", color: "white", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar style={{ backgroundColor: "#5c0a89" }} variant="dark">
        <Container>
          <Navbar.Brand href="#" className="fw-bold">
            Luminar Attendance Manager
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Batch List */}
      <Container className="mt-4">
        <Row className="g-3">
          {batches.length > 0 ? (
            batches.map((batch) => (
              <Col key={batch._id} md={4} sm={6} xs={12}>
                <Card 
                  style={{ backgroundColor: "#7c1cad", color: "white", cursor: "pointer" }}
                  onClick={() => handleCardClick(batch)}
                >
                  <Card.Body className="d-flex justify-content-center align-items-center">
                    <Card.Title className="fw-bold">{batch.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center w-100 mt-5">No batches available or loading...</div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default BatchList;
