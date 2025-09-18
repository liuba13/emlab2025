import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing Eco Monitoring API...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health:', healthData.status);

    // Test 2: Get all stations
    console.log('\n2. Testing stations endpoint...');
    const stationsResponse = await fetch(`${BASE_URL}/api/stations`);
    const stationsData = await stationsResponse.json();
    console.log(`✅ Stations: ${stationsData.data?.length || 0} found`);

    // Test 3: Sync with SaveEcoBot
    console.log('\n3. Testing SaveEcoBot sync...');
    const syncResponse = await fetch(`${BASE_URL}/api/saveecobot/sync`);
    const syncData = await syncResponse.json();
    console.log('✅ Sync results:', syncData.results);

    // Test 4: Get latest measurements
    console.log('\n4. Testing latest measurements...');
    const latestResponse = await fetch(`${BASE_URL}/api/measurements/latest`);
    const latestData = await latestResponse.json();
    console.log(`✅ Latest measurements: ${latestData.data?.length || 0} stations`);

    console.log('\n🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();