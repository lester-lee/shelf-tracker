const axios = require("axios");

module.exports = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
  },
});
