import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Badge, Button } from 'react-bootstrap';
import apiService from '../services/api';

function Header() {
  const [healthStatus, setHealthStatus] = useState('checking');
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const health = await apiService.getHealth();
      setHealthStatus(health.success ? 'healthy' : 'unhealthy');
    } catch (error) {
      setHealthStatus('unhealthy');
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await apiService.syncSaveEcoBot();
      alert('Синхронізація завершена!');
      window.location.reload();
    } catch (error) {
      alert('Помилка синхронізації: ' + error.message);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Brand href="#home">
          Екологічний моніторинг
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#stations">Станції</Nav.Link>
            <Nav.Link href="#measurements">Вимірювання</Nav.Link>
          </Nav>
          <Nav>
            <div className="d-flex align-items-center">
              <Badge 
                bg={healthStatus === 'healthy' ? 'success' : 'danger'}
                className="me-3"
              >
                Сервер: {healthStatus}
              </Badge>
              <Button 
                variant="outline-light" 
                size="sm"
                onClick={handleSync}
                disabled={syncing}
              >
                {syncing ? 'Синхронізація...' : 'Синхронізувати'}
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;