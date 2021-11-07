const axios = require("axios");

module.exports = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
  headers: {
    "Content-type": "application/json",
  },
});
