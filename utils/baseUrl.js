const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "localhost:9000"
    : "https://www.etherealshapes.net"

module.exports = baseUrl;
