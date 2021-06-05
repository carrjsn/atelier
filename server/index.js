const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const gitToken = process.env.GIT_API_TOKEN;

const app = express();
const servingPath = path.join(__dirname, '..', 'client', 'dist');

app.use(express.static(servingPath));

console.log(gitToken);

app.get('/reviews', (req, res) => {
  return axios.get (`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/?count=${req.query.count}&product_id=${req.query.productId}`, {
    headers: {
      'Authorization': gitToken
    }
  })
  .then((resp) => res.status(200).send(resp.data.results))
  .catch((err) => {
    console.log('ERROR GETTING REVIEWS FROM ATELIER API', err)
  })
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});