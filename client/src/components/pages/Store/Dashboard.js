import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ProgressBar, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faShoppingCart, faTasks, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  // Mock data or API integration
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [tasks, setTasks] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  
  // Simulate fetching data from APIs or backend
  useEffect(() => {
    // Replace with actual API calls
    fetchUsersCount();
    fetchProductsCount();
    fetchRevenue();
    fetchTasks();
    fetchRecentOrders();
    fetchRecentActivities();
  }, []);

  const fetchUsersCount = () => {
    // Simulate API call
    setTimeout(() => {
      setUsersCount(1234);
    }, 1000); // Delay to simulate network latency
  };

  const fetchProductsCount = () => {
    // Simulate API call
    setTimeout(() => {
      setProductsCount(567);
    }, 1200); // Delay to simulate network latency
  };

  const fetchRevenue = () => {
    // Simulate API call
    setTimeout(() => {
      setRevenue(12345);
    }, 800); // Delay to simulate network latency
  };

  const fetchTasks = () => {
    // Simulate API call
    setTimeout(() => {
      setTasks(42);
    }, 1500); // Delay to simulate network latency
  };

  const fetchRecentOrders = () => {
    // Simulate API call or use real data
    const orders = [
      { id: 1, product: 'T-shirt', customer: 'John Doe', status: 'Shipped', date: '2024-06-20' },
      { id: 2, product: 'Jeans', customer: 'Jane Smith', status: 'Processing', date: '2024-06-21' },
      // Add more orders as needed
    ];
    setRecentOrders(orders);
  };

  const fetchRecentActivities = () => {
    // Simulate API call or use real data
    const activities = [
      'John Doe added a new product.',
      'Jane Smith updated her profile.',
      'Admin changed the site settings.',
      // Add more activities as needed
    ];
    setRecentActivities(activities);
  };

  return (
    <Container fluid className="dashboard-container">
      <Row className="mb-4">
        <Col>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-welcome">Welcome to your dashboard. Here you can manage your content and products.</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faUsers} size="3x" />
              <Card.Title className="mt-2">Users</Card.Title>
              <Card.Text>{usersCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faShoppingCart} size="3x" />
              <Card.Title className="mt-2">Products</Card.Title>
              <Card.Text>{productsCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <FontAwesomeIcon icon={faDollarSign} size="3x" className="mt-3" />
            <Card.Body>
              <Card.Title className="mt-2">Revenue</Card.Title>
              <Card.Text>${revenue.toLocaleString()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <FontAwesomeIcon icon={faTasks} size="3x" className="mt-3" />
            <Card.Body>
              <Card.Title className="mt-2">Tasks</Card.Title>
              <Card.Text>{tasks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Sales Statistics</Card.Header>
            <Card.Body>
              {/* Replace with actual sales data rendering */}
              <ProgressBar now={60} label="60%" className="mb-3" />
              <ProgressBar now={80} label="80%" className="mb-3" />
              <ProgressBar now={50} label="50%" className="mb-3" />
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>Recent Orders</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.product}</td>
                      <td>{order.customer}</td>
                      <td>{order.status}</td>
                      <td>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="primary" size="sm" className="mt-3">
                View All Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Recent Activities</Card.Header>
            <ListGroup variant="flush">
              {recentActivities.map((activity, index) => (
                <ListGroup.Item key={index}>{activity}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
          <Card className="mb-4">
            <Card.Header>Task Progress</Card.Header>
            <Card.Body>
              <ProgressBar striped variant="success" now={40} label="40%" className="mb-2" />
              <ProgressBar striped variant="info" now={20} label="20%" className="mb-2" />
              <ProgressBar striped variant="warning" now={60} label="60%" className="mb-2" />
              <ProgressBar striped variant="danger" now={80} label="80%" className="mb-2" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
