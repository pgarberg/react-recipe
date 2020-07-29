const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/api",
      "/auth/google",
      "/auth/peder",
      "/auth/google/callback",
      "/recipes",
      "/auth/local",
      "/auth/logout",
    ],
    createProxyMiddleware({
      target: "http://localhost:4000/",
    })
  );
};
