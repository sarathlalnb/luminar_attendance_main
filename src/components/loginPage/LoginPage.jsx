import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../contexts/authContext";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import groupImage from "../../images/Group1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import logoImage from "../../images/logo1.png";
import { endpoints } from "../../defaults";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setCurrentUser, loggoff } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    loggoff(() => {
      console.log("logged off");
    });
  }, [loggoff]);

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Email Address is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password should be of minimum 4 characters length";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post("https://api.crm.luminartechnolab.com/api/user/login", formData);
        if (response.data) {
          setCurrentUser(response.data);
          navigate("/");  
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Error Occurred. Please contact Admin !!";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container className="login-main" fluid>
      <Row>
        <Col md={7} className="hide">
          <Image
            className="side-img "
            src={groupImage}
            alt="Luminar Technolab"
          />
        </Col>
        <Col md={5} className="login-container">
          <div className="form-container">
            <Row>
              <Col
                md={4}
                className="title-container-logo  d-flex justify-content-end"
              >
                <Image
                  className="logo"
                  src={logoImage}
                  alt="Luminar Technolab"
                />
              </Col>
              <Col md={6} className="title-container d-flex align-items-end">
                <h1 className="ttile">Attendance Manager</h1>
              </Col>
            </Row>
            <div className="data-container">
              <div className="mt-5">
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="phoneNumberInput">
                    <Form.Control
                      className="inputbox"
                      type="email"
                      placeholder="Enter your Email Address"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <div className="error_msg">{errors.username}</div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="passwordInput" className="mt-4">
                    <Form.Control
                      className="inputbox"
                      type="password"
                      placeholder="Enter your Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="error_msg">{errors.password}</div>
                    )}
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="btn login-btn mt-4 fw-bold"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default LoginPage;
