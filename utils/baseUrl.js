const baseUrl =
  process.env.NODE_ENV !== "production"
    ? ""
    : "https://www.etherealshapes.net"

module.exports = baseUrl;
