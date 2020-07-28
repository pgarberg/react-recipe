const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google", "/auth/peder", "/auth/google/callback", "/auth"],
    createProxyMiddleware({
      target: "http://localhost:4000/",
      changeOrigin: true,
    })
  );
};
