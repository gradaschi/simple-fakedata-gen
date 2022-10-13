const { faker } = require("@faker-js/faker");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const url = require("url");
const app = express();

const generateFakeData = ({ gen }) => {
  data = [];
  var len = gen;
  while (len--) {
    data.push({
      col1: faker.name.firstName(),
      col2: faker.name.lastName(),
      col3: faker.phone.number(),
      col4: faker.address.streetAddress(),
      col5: faker.address.city(),
      col6: faker.address.state(),
    });
  }
  return data;
};

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/api/fakedata/", (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const gen = queryObject.gen;
  const data = generateFakeData({ gen });
  res.send(data);
});

// starting the server
app.listen(3001, () => {
  console.log("listening on port 3001");
});
