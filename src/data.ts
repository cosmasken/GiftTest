export async function fetchData() {
  try {
    const response = await fetch(
      'https://run.mocky.io/v3/2598c0cf-5647-4ecc-ba4b-15cbc14a2124',
    );
    const data = await response.json();
    const merchantjson = data.result.message;
    if (merchantjson && Array.isArray(merchantjson)) {
      return merchantjson;
    }
  } catch (error) {
    console.error(error);
  }
  // Return empty array if there was an error or the fetched data is not an array
  return [];
}
