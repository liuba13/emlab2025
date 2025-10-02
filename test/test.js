const fetch = require("node-fetch");
global.fetch = fetch;

const BASE_URL = "http://localhost:3000";

describe("Eco Monitoring API", () => {
  test("Health endpoint works", async () => {
    const response = await fetch(`${BASE_URL}/health`);
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.status).toBe("healthy");
  });

  test("Stations endpoint returns list", async () => {
    const response = await fetch(`${BASE_URL}/api/stations`);
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(Array.isArray(data.data)).toBe(true);
  });

  test(
  "SaveEcoBot sync endpoint works",
  async () => {
    const response = await fetch(`${BASE_URL}/api/saveecobot/sync`);
    expect(response.ok).toBe(true);

    const data = await response.json();

    // Перевірки на основі твого JSON
    expect(data).toHaveProperty("success", true);
    expect(data).toHaveProperty("message", "SaveEcoBot data synchronized successfully");
    expect(data).toHaveProperty("results");
    expect(data.results).toHaveProperty("stations_processed");
    expect(data.results).toHaveProperty("stations_updated");
    expect(data.results).toHaveProperty("measurements_created");

    // Перевірка що є масив помилок
    expect(Array.isArray(data.results.errors)).toBe(true);
  },
  20000 // 20 секунд на тест
);

  test("Latest measurements endpoint returns data", async () => {
    const response = await fetch(`${BASE_URL}/api/measurements/latest`);
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(Array.isArray(data.data)).toBe(true);
  });
});

// Коментарі до коду:
// Імпортуємо бібліотеку node-fetch для використання fetch у Node.js середовищі.
// Встановлюємо глобальну змінну fetch, щоб вона була доступна у всьому коді.
// Визначаємо базовий URL для API.
// Використовуємо describe для групування пов'язаних тестів.
// Кожен test перевіряє окремий аспект API:
// - Перевірка стану здоров'я сервера (health endpoint).
// - Перевірка отримання списку станцій (stations endpoint).
// - Перевірка роботи синхронізації з SaveEcoBot (sync endpoint).
// - Перевірка отримання останніх вимірювань (latest measurements endpoint).
// Використовуємо expect для перевірки результатів запитів.
// Для тесту синхронізації з SaveEcoBot встановлено таймаут 20 секунд через можливу тривалість операції.
// Запити до API виконуються за допомогою fetch, а відповіді перевіряються на коректність та структуру даних.


//////////////////////////////

// async function testAPI() {
//   console.log('🧪 Testing Eco Monitoring API...\n');

//   try {
//     // Test 1: Health check
//     console.log('1. Testing health endpoint...');
//     const healthResponse = await fetch(`${BASE_URL}/health`);
//     const healthData = await healthResponse.json();
//     console.log('✅ Health:', healthData.status);

//     // Test 2: Get all stations
//     console.log('\n2. Testing stations endpoint...');
//     const stationsResponse = await fetch(`${BASE_URL}/api/stations`);
//     const stationsData = await stationsResponse.json();
//     console.log(`✅ Stations: ${stationsData.data?.length || 0} found`);

//     // Test 3: Sync with SaveEcoBot
//     console.log('\n3. Testing SaveEcoBot sync...');
//     const syncResponse = await fetch(`${BASE_URL}/api/saveecobot/sync`);
//     const syncData = await syncResponse.json();
//     console.log('✅ Sync results:', syncData.results);

//     // Test 4: Get latest measurements
//     console.log('\n4. Testing latest measurements...');
//     const latestResponse = await fetch(`${BASE_URL}/api/measurements/latest`);
//     const latestData = await latestResponse.json();
//     console.log(`✅ Latest measurements: ${latestData.data?.length || 0} stations`);

//     console.log('\n🎉 All tests completed successfully!');

//   } catch (error) {
//     console.error('❌ Test failed:', error.message);
//   }
// }

// testAPI();

