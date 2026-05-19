const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: 'playcms_client_app/.env' });

const getApi = async () => {
  const token = process.env.API_KEY;
  const projectId = process.env.API_PROJECT_ID;
  
  console.log(`Token: ${token}`);
  console.log(`ProjectId: ${projectId}`);
  
  try {
    const response = await axios.get(process.env.API_BASE_URL + '/products', {
      headers: {
        'X-API-Key': token,
        'X-Project-ID': projectId,
        'Requested-By': 'coastline'
      }
    });
    console.log(`Status: ${response.status}`);
    // console.log(response.data);
  } catch (error) {
    console.error(`Error: ${error.response ? error.response.status : error.message}`);
    if (error.response) console.error(error.response.data);
  }
}

getApi();
