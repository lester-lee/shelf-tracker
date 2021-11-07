const axios = require("axios");

module.exports = axios.create({
  baseURL: "http://192.168.0.202:4000",
  headers: {
    "Content-type": "application/json",
  },
});
