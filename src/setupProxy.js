const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {

    app.use(
        createProxyMiddleware("/login", {
          target:"http://localhost:8080/api/auth/login",
          changeOrigin: true,
          secure: false,
          logLevel: "debug",
          pathRewrite: {
            "^/login": "http://localhost:8080",
          },
        })
      );

      app.use(
        createProxyMiddleware("/register", {
          target:"http://localhost:8080/api/auth/register",
          changeOrigin: true,
          secure: false,
          logLevel: "debug",
          pathRewrite: {
            "^/register": "http://localhost:8080",
          },
        })
      );

      app.use(
        createProxyMiddleware("/fetchDocuemnt/", {
          target:"http://localhost:8080/api/documents/by-owner",
          changeOrigin: true,
          secure: false,
          logLevel: "debug",
          pathRewrite: {
            "^/fetchDocuemnt": "http://localhost:8080",
          },
        })
      );

      app.use(
        createProxyMiddleware("/ws", {
          target:"http://localhost:8080/ws",
          changeOrigin: true,
          secure: false,
          logLevel: "debug",
          pathRewrite: {
            "^/ws": "http://localhost:8080",
          },
        })
      );

      app.use(
        createProxyMiddleware("/createDocument", {
          target:"http://localhost:8080/createDocument",
          changeOrigin: true,
          secure: false,
          logLevel: "debug",
          pathRewrite: {
            "^/createDocument": "http://localhost:8080",
          },
        })
      );
    }