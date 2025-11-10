const axios = require("axios");

async function findNearestPlace(lat, lng, query) {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: query,
        format: "json",
        limit: 1,
        viewbox: `${lng-0.05},${lat+0.05},${lng+0.05},${lat-0.05}`,
        bounded: 1
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

findNearestPlace(40.7128, -74.0060, "restaurant")
  .then(results => console.log(results))
  .catch(err => console.error(err));
