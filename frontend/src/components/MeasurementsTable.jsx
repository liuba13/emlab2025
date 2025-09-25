import React, { useState, useEffect } from 'react';
import { Table, Alert, Spinner, Badge, Button } from 'react-bootstrap';
import apiService from '../services/api';

function MeasurementsTable() {
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (showAll) {
      fetchAllMeasurements();
    } else {
      fetchLatestMeasurements();
    }
  }, [showAll]);

  const fetchLatestMeasurements = async () => {
    try {
      setLoading(true);
      const response = await apiService.getLatestMeasurements();
      setMeasurements(response.data || []);
      setError(null);
    } catch (err) {
      setError('Помилка завантаження останніх вимірювань: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllMeasurements = async () => {
    try {
      setLoading(true);
      const response = await apiService.getMeasurements({ limit: 100 });
      setMeasurements(response.data || []);
      setError(null);
    } catch (err) {
      setError('Помилка завантаження всіх вимірювань: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPollutantBadge = (pollutant, value) => {
    const thresholds = {
      'PM2.5': { warning: 25, danger: 75 },
      'PM10': { warning: 50, danger: 150 },
      'Air Quality Index': { warning: 50, danger: 150 }
    };

    const threshold = thresholds[pollutant];
    if (!threshold) return 'secondary';

    if (value > threshold.danger) return 'danger';
    if (value > threshold.warning) return 'warning';
    return 'success';
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Завантаження...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <div className="mb-3">
        <Button 
          variant={showAll ? "outline-primary" : "primary"}
          onClick={() => setShowAll(!showAll)}
          size="sm"
        >
          {showAll ? 'Показати останні' : 'Показати всі'}
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Станція</th>
            <th>Час вимірювання</th>
            <th>Забруднювачі</th>
            <th>Джерело</th>
          </tr>
        </thead>
        <tbody>
          {measurements.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                Вимірювання не знайдені
              </td>
            </tr>
          ) : (
            measurements.map((measurement, index) => (
              <tr key={measurement._id || index}>
                <td>
                  <code>{measurement.station_id}</code>
                </td>
                <td>
                  <small>
                    {new Date(measurement.measurement_time).toLocaleString('uk-UA')}
                  </small>
                </td>
                <td>
                  <div>
                    {measurement.pollutants?.map((pollutant, idx) => (
                      <Badge 
                        key={idx}
                        bg={getPollutantBadge(pollutant.pollutant, pollutant.value)}
                        className="me-1 mb-1"
                      >
                        {pollutant.pollutant}: {pollutant.value} {pollutant.unit}
                      </Badge>
                    )) || 'Немає даних'}
                  </div>
                </td>
                <td>
                  <small>{measurement.metadata?.source || 'Невідоме'}</small>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      
      {measurements.length > 0 && (
        <div className="mt-2">
          <small className="text-muted">
            {showAll ? `Показано ${measurements.length} записів` : `Останні вимірювання по станціях: ${measurements.length}`}
          </small>
        </div>
      )}
    </div>
  );
}

export default MeasurementsTable;